from PyQt6.QtWidgets import (
    QApplication,
    QWidget,
    QVBoxLayout,
    QHBoxLayout,
    QLabel,
    QLineEdit,
    QPushButton,
    QTableWidget,
    QTableWidgetItem,
    QMessageBox,
    QSizePolicy,
)
from PyQt6.QtCore import Qt
import pandas as pd
import os
from openpyxl import load_workbook

FILE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "portfolio.xlsx")


class SwapReorderTable(QTableWidget):
    def __init__(self):
        super().__init__()
        self.drag_row = -1
        self.dragging = False

    def mousePressEvent(self, event):
        col = self.columnAt(event.pos().x())
        row = self.rowAt(event.pos().y())
        if col == 0 and row >= 0:
            self.drag_row = row
            self.dragging = True
        else:
            self.dragging = False
        super().mousePressEvent(event)

    def mouseMoveEvent(self, event):
        if not self.dragging:
            return
        pos = event.pos()
        target_row = self.rowAt(pos.y())
        if target_row >= 0 and target_row != self.drag_row:
            self.swap_rows(self.drag_row, target_row)
            self.drag_row = target_row

    def mouseReleaseEvent(self, event):
        self.dragging = False
        self.drag_row = -1
        super().mouseReleaseEvent(event)

    def swap_rows(self, row1, row2):
        if row1 < 0 or row2 < 0:
            return
        for col in range(self.columnCount()):
            item1 = self.item(row1, col)
            item2 = self.item(row2, col)
            text1 = item1.text() if item1 else ""
            text2 = item2.text() if item2 else ""
            self.setItem(row1, col, QTableWidgetItem(text2))
            self.setItem(row2, col, QTableWidgetItem(text1))


class PortfolioApp(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Portfolio Manager")
        self.showMaximized()
        self.initUI()
        self.load_data()
        self.populate_list()

    def initUI(self):
        main_layout = QVBoxLayout()
        input_layout = QHBoxLayout()
        button_layout = QHBoxLayout()

        self.title_input = QLineEdit()
        self.title_input.setPlaceholderText("Enter Title")
        self.title_input.setMinimumHeight(35)
        self.desc_input = QLineEdit()
        self.desc_input.setPlaceholderText("Enter Description")
        self.desc_input.setMinimumHeight(35)
        self.img_input = QLineEdit()
        self.img_input.setPlaceholderText("Enter Image Link")
        self.img_input.setMinimumHeight(35)

        input_layout.addWidget(QLabel("Title:"))
        input_layout.addWidget(self.title_input)
        input_layout.addWidget(QLabel("Description:"))
        input_layout.addWidget(self.desc_input)
        input_layout.addWidget(QLabel("Image Link:"))
        input_layout.addWidget(self.img_input)

        self.publish_button = QPushButton("Publish")
        self.delete_button = QPushButton("Delete Selected")
        self.save_button = QPushButton("Save")
        self.refresh_button = QPushButton("Refresh")

        for btn in [
            self.publish_button,
            self.delete_button,
            self.save_button,
            self.refresh_button,
        ]:
            btn.setMinimumHeight(50)
            btn.setStyleSheet("font-size: 16px; padding: 10px;")
            btn.setSizePolicy(QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Fixed)

        self.publish_button.clicked.connect(self.add_post)
        self.delete_button.clicked.connect(self.delete_post)
        self.save_button.clicked.connect(self.save_and_notify)
        self.refresh_button.clicked.connect(self.refresh_and_notify)

        button_layout.addWidget(self.publish_button)
        button_layout.addWidget(self.delete_button)
        button_layout.addWidget(self.save_button)
        button_layout.addWidget(self.refresh_button)

        self.table = SwapReorderTable()
        self.table.setColumnCount(4)
        self.table.setHorizontalHeaderLabels(
            ["⠿", "Title", "Description", "Image Link"]
        )
        self.table.setColumnWidth(0, 60)
        self.table.setColumnWidth(1, 400)
        self.table.setColumnWidth(2, 800)
        self.table.setColumnWidth(3, 500)
        self.table.setSelectionBehavior(QTableWidget.SelectionBehavior.SelectRows)
        self.table.setAlternatingRowColors(True)

        main_layout.addLayout(input_layout)
        main_layout.addLayout(button_layout)
        main_layout.addWidget(self.table)
        self.setLayout(main_layout)

    def load_data(self):
        if os.path.exists(FILE_PATH):
            self.df = pd.read_excel(FILE_PATH, engine="openpyxl")
        else:
            self.df = pd.DataFrame(columns=["Title", "Description", "Image Link"])
            self.save_data()

    def save_data(self):
        with pd.ExcelWriter(FILE_PATH, engine="openpyxl") as writer:
            self.df.to_excel(writer, index=False)
            workbook = writer.book
            worksheet = workbook.active
            widths = [6, 50, 90, 60]
            for i, w in enumerate(widths, start=1):
                worksheet.column_dimensions[
                    worksheet.cell(row=1, column=i).column_letter
                ].width = w
            workbook.save(FILE_PATH)

    def populate_list(self):
        self.table.setRowCount(0)
        for _, row in self.df.iterrows():
            r = self.table.rowCount()
            self.table.insertRow(r)
            self.table.setItem(r, 0, QTableWidgetItem("⠿"))
            self.table.setItem(r, 1, QTableWidgetItem(str(row["Title"])))
            self.table.setItem(r, 2, QTableWidgetItem(str(row["Description"])))
            self.table.setItem(r, 3, QTableWidgetItem(str(row["Image Link"])))

    def add_post(self):
        entry = {
            "Title": self.title_input.text(),
            "Description": self.desc_input.text(),
            "Image Link": self.img_input.text(),
        }
        if not all(entry.values()):
            QMessageBox.warning(self, "Error", "All fields are required!")
            return
        self.df = pd.concat([self.df, pd.DataFrame([entry])], ignore_index=True)
        self.save_data()
        self.populate_list()
        self.title_input.clear()
        self.desc_input.clear()
        self.img_input.clear()
        QMessageBox.information(self, "Success", "Post added successfully!")

    def delete_post(self):
        row = self.table.currentRow()
        if row < 0:
            QMessageBox.warning(self, "Warning", "Please select a post to delete!")
            return
        title = self.table.item(row, 1).text()
        self.df = self.df[self.df["Title"] != title]
        self.save_data()
        self.populate_list()
        QMessageBox.information(self, "Deleted", "Post deleted successfully!")

    def save_and_notify(self):
        self.update_dataframe_from_table()
        self.save_data()
        QMessageBox.information(self, "Saved", "Changes saved successfully!")

    def update_dataframe_from_table(self):
        rows = self.table.rowCount()
        data = []
        for r in range(rows):
            title = self.table.item(r, 1).text()
            desc = self.table.item(r, 2).text()
            link = self.table.item(r, 3).text()
            data.append([title, desc, link])
        self.df = pd.DataFrame(data, columns=["Title", "Description", "Image Link"])

    def refresh_and_notify(self):
        self.load_data()
        self.populate_list()
        QMessageBox.information(self, "Refreshed", "Data refreshed successfully!")


if __name__ == "__main__":
    app = QApplication([])
    window = PortfolioApp()
    window.show()
    app.exec()
