import React from 'react'
import * as XLSX from 'xlsx'

interface Data {
    Name: string
    Age: number
}

function exportToExcel(data: Data[], filename: string): void {
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    XLSX.writeFile(workbook, filename + '.xlsx')
}

const Index = () => {
    const data: Data[] = [
        { Name: 'John', Age: 35 },
        { Name: 'Jane', Age: 27 },
        { Name: 'Bob', Age: 44 }
    ]

    const handleExport = () => {
        exportToExcel(data, 'my-table')
    }

    return (
        <div>
            <button onClick={handleExport}>Export to Excel</button>
        </div>
    )
}

export default Index
