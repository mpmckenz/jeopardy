class JeopardyGrid extends Grid {

    constructor(options) {
        super(options)
        this.getCategoryInfo(options.categoryIDs)
    }

    addClueToCell(cell, clue) {
        cell.pointValue = clue.value
        cell.question = clue.question
        cell.answer = clue.answer
        cell.cellElement.innerText = cell.pointValue
    }

    loopOverCategories(categories) {
        for (let rowIndex = 0; rowIndex < this.numberOfRows; rowIndex++) {
            for (let colIndex = 0; colIndex < this.numberOfColumns; colIndex++) {
                const cell = this.gridArray[rowIndex][colIndex]
                const category = categories[colIndex]
                const clue = category.clues[rowIndex]

                this.addClueToCell(cell, clue)
            }
        }
    }

    async getCategoryInfo(categoryIDs) {
        const categoriesInfo = categoryIDs.map(categoryID => {
            return fetch("http://jservice.io/api/category?id=" + categoryID)
                .then(res => res.json())
        })
        const categories = await Promise.all(categoriesInfo)
        
        this.loopOverCategories(categories)
    }
}

class JeopardyHeaderGrid extends JeopardyGrid { 
    constructor(options) {
        super(options)
    }

    addCategoryToCell(cell, category) {
        cell.cellElement.innerText = category.title
    }

    loopOverCategories(categories) {
        for (let colIndex = 0; colIndex < this.numberOfColumns; colIndex++) {
            const cell = this.gridArray[0][colIndex]
            const category = categories[colIndex]
            this.addCategoryToCell(cell, category)
        }
    }

}

const categories = [777, 136, 780, 21, 105, 25]

const jeopardyGrid = new JeopardyHeaderGrid({
    numberOfRows: 1,
    numberOfColumns: categories.length,
    parentContainerId: "categories",
    categoryIDs: categories
})

const jeopardyClues = new JeopardyGrid({
    numberOfRows: 5,
    numberOfColumns: categories.length,
    parentContainerId: "jeopardyClues",
    categoryIDs: categories
})

    // async fruitRandomClue() {
    //     const fruitFetchHydrated = await fetch("http://jservice.io/api/category?id=777").then(fruitFetchHydrated => fruitFetchHydrated.json())
    //     let categoryFruitTitle = fruitFetchHydrated.title

    //     let categoryFruit = document.getElementById("0,0")
    //     let fruitCategory = document.createTextNode(categoryFruitTitle)
    //     categoryFruit.appendChild(fruitCategory)
    // }


// function postToDOM(cellElementId) {
//     let categoryName = document.getElementById(cellElementId)
//     let categoryNode = document.createTextNode(categoryFruitTitle)
//     categoryName.appendChild(fruitCategory)
// }

// let categoryTitle = categoriesInfo.title
// let categoryElement = document.getElementById("categories")
// let categoryNode = document.createTextNode(categoryTitle)
// categoryElement.appendChild(categoryNode)