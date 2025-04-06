from PyQt6.QtWidgets import (
    QApplication,
    QWidget,
    QVBoxLayout,
    QLabel,
    QLineEdit,
    QPushButton,
    QTableWidget,
    QTableWidgetItem,
    QMessageBox,
    QDateEdit,
    QTimeEdit,
)
from PyQt6.QtCore import Qt, QDate
import pandas as pd
from openpyxl import load_workbook
import os
from datetime import datetime

FILE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "portfolio.xlsx")


class PortfolioApp(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Portfolio Manager")
        self.setGeometry(100, 100, 800, 500)
        self.initUI()
        self.load_data()
        self.populate_list()

    def initUI(self):
        layout = QVBoxLayout()

        self.date_edit = QDateEdit()
        self.date_edit.setCalendarPopup(True)
        self.date_edit.setDate(QDate.currentDate())
        layout.addWidget(QLabel("Date:"))
        layout.addWidget(self.date_edit)

        self.time_edit = QTimeEdit()
        self.time_edit.setTime(datetime.now().time())
        layout.addWidget(QLabel("Time:"))
        layout.addWidget(self.time_edit)

        self.title_input = QLineEdit()
        layout.addWidget(QLabel("Title:"))
        layout.addWidget(self.title_input)

        self.desc_input = QLineEdit()
        layout.addWidget(QLabel("Description:"))
        layout.addWidget(self.desc_input)

        self.img_input = QLineEdit()
        layout.addWidget(QLabel("Image Link:"))
        layout.addWidget(self.img_input)

        self.publish_button = QPushButton("Publish")
        self.publish_button.clicked.connect(self.add_post)
        layout.addWidget(self.publish_button)

        self.table = QTableWidget()
        self.table.setColumnCount(4)  # Update column count to 4
        self.table.setHorizontalHeaderLabels(
            ["Date & Time", "Title", "Description", "Image Link"]
        )
        layout.addWidget(self.table)

        self.delete_button = QPushButton("Delete Selected")
        self.delete_button.clicked.connect(self.delete_post)
        layout.addWidget(self.delete_button)

        self.save_button = QPushButton("Save")
        self.save_button.clicked.connect(self.save_and_notify)
        layout.addWidget(self.save_button)

        self.refresh_button = QPushButton("Refresh")
        self.refresh_button.clicked.connect(self.refresh_and_notify)
        layout.addWidget(self.refresh_button)

        self.setLayout(layout)

    def load_data(self):
        if os.path.exists(FILE_PATH):
            self.df = pd.read_excel(FILE_PATH, engine="openpyxl")
        else:
            self.df = pd.DataFrame(
                columns=["Date & Time", "Title", "Description", "Image Link"]
            )
            self.save_data()

    def save_data(self):
        with pd.ExcelWriter(FILE_PATH, engine="openpyxl") as writer:
            self.df.to_excel(writer, index=False)
            workbook = writer.book
            worksheet = workbook.active
            column_widths = [30, 30, 50, 40]  # Update column widths
            for i, width in enumerate(column_widths, start=1):
                worksheet.column_dimensions[
                    worksheet.cell(row=1, column=i).column_letter
                ].width = width
            workbook.save(FILE_PATH)

    def populate_list(self):
        self.table.setRowCount(0)
        for _, row in self.df.iterrows():
            row_position = self.table.rowCount()
            self.table.insertRow(row_position)
            for col, value in enumerate(row):
                self.table.setItem(row_position, col, QTableWidgetItem(str(value)))

    def add_post(self):
        date_time_str = f"{self.date_edit.date().toString('yyyy-MM-dd')} {self.time_edit.time().toString('HH:mm:ss')}"
        new_entry = {
            "Date & Time": date_time_str,
            "Title": self.title_input.text(),
            "Description": self.desc_input.text(),
            "Image Link": self.img_input.text(),
        }
        if not all(new_entry.values()):
            QMessageBox.warning(self, "Error", "All fields are required!")
            return
        self.df = pd.concat([self.df, pd.DataFrame([new_entry])], ignore_index=True)
        self.save_data()
        self.populate_list()
        self.title_input.clear()
        self.desc_input.clear()
        self.img_input.clear()
        QMessageBox.information(self, "Success", "Post added successfully!")

    def delete_post(self):
        selected = self.table.currentRow()
        if selected < 0:
            QMessageBox.warning(self, "Warning", "Please select a post to delete!")
            return
        title = self.table.item(selected, 1).text()  # Update column index for title
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
        columns = self.table.columnCount()
        data = []
        for row in range(rows):
            row_data = []
            for column in range(columns):
                item = self.table.item(row, column)
                row_data.append(item.text() if item else "")
            data.append(row_data)
        self.df = pd.DataFrame(
            data, columns=["Date & Time", "Title", "Description", "Image Link"]
        )

    def refresh_and_notify(self):
        self.load_data()
        self.populate_list()
        QMessageBox.information(self, "Refreshed", "Data refreshed successfully!")


if __name__ == "__main__":
    app = QApplication([])
    window = PortfolioApp()
    window.show()
    app.exec()
