export const Sort_Integer_Column = (TableName, ColumnIndex) => {
    try {
        let rows, switching, i, x, y, shouldSwitch, dir, switchCount
        const table = document.getElementById(TableName)
        switching = true
        switchCount = 0
        dir = "asc"

        while (switching) {
            switching = false
            rows = table.rows

            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false

                x = rows[i].getElementsByTagName("td")[ColumnIndex]
                y = rows[i + 1].getElementsByTagName("td")[ColumnIndex]

                if (dir === "asc") {
                    if (Number(x.innerHTML) > Number(y.innerHTML)) {
                        shouldSwitch = true
                        break
                    }
                } else if (dir === "desc") {
                    if (Number(x.innerHTML) < Number(y.innerHTML)) {
                        shouldSwitch = true
                        break
                    }
                }
            }
            if (shouldSwitch) {

                rows[i].parentNode.insertBefore(rows[i + 1], rows[i])
                switching = true
                switchCount = switchCount + 1
            } else {

                if (switchCount === 0 && dir === "asc") {
                    dir = "desc"
                    switching = true
                }
            }
        }
    } catch (err) {
        console.log('Log: Sort_Integer_Column -> err', err)
    }
}

export const Sort_String_Column = (TableName, ColumnIndex) => {
    try {
        let rows, switching, i, x, y, shouldSwitch, dir, switchCount
        const table = document.getElementById(TableName)
        switching = true
        switchCount = 0
        dir = "asc"

        while (switching) {
            switching = false
            rows = table.rows

            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false

                x = rows[i].getElementsByTagName("td")[ColumnIndex]
                y = rows[i + 1].getElementsByTagName("td")[ColumnIndex]

                if (dir === "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true
                        break
                    }
                } else if (dir === "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true
                        break
                    }
                }
            }
            if (shouldSwitch) {

                rows[i].parentNode.insertBefore(rows[i + 1], rows[i])
                switching = true
                switchCount = switchCount + 1
            } else {

                if (switchCount === 0 && dir === "asc") {
                    dir = "desc"
                    switching = true
                }
            }
        }
    } catch (err) {
        console.log('Log: Sort_String_Column -> err', err)
    }
}