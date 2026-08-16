// チェックリスト一覧のデータ型
type CheckListName = {
    check_list_id : number;
    check_list_name : string;
}

// テストデータ
let testData: CheckListName[] = [
    {
        check_list_id:1,
        check_list_name:"チェックリスト1"
    },
    {
        check_list_id:2,
        check_list_name:"チェックリスト2"
    },
    {
        check_list_id:3,
        check_list_name:"チェックリスト3"
    },
]

// 削除対象のチェックリスト
let selectedDeleteCheckList: number[] = [];

// チェックリスト一覧
let getListName:CheckListName[] = testData;

// 現在のページ数
let nowPageNumber: number = 1;

// 検索文字列
let searchString: string = "";

// 選択されたチェックリストの削除を行う
let DeleteMultiCHeckList = async(selectedList: number[]) =>{
    try{
        const response = await fetch("http://localhost:8080/api/DeleteSelectedList", {
            method:"DELETE",
            body:JSON.stringify({list:selectedList})
        });
        if(!response.ok){
            alert("削除に失敗しました")
        }
        else{
            alert("削除に成功しました")
        }
    }
    catch(error){
        alert("通信エラーが置きました");
        console.log(error);
    }
}

// 一覧取得をする
let GetCheckList = async(pageNumber: number, searchString: string) =>{
    try{
        const response = await fetch("http://localhost:8080/api/GetCheckList", {
            method:"GET",
            body:JSON.stringify({page: pageNumber, keyWord: searchString})
        })
        if(!response.ok){
            alert("一覧の取得に失敗しました")
        }
        else{
            getListName = await response.json();
            ShowCheckList(getListName);
        }
    }catch(error){
        alert("一覧の取得に失敗しました");
        console.log(error);
    }
}

// チェックリスト一覧を表示する
let ShowCheckList = (checkListName: CheckListName[]) =>{
        const tableBody = document.querySelector('tbody') as HTMLTableSectionElement;

        checkListName.forEach(element =>{
        let tableLine: HTMLTableRowElement = document.createElement('tr') as HTMLTableRowElement;
        tableLine.classList.add('check-list-row');

        let tableDataAsCheck: HTMLTableCellElement = document.createElement('td') as HTMLTableCellElement;
        tableDataAsCheck.classList.add('check-box-cell');
        
        let tableDataAsName: HTMLTableCellElement = document.createElement('td') as HTMLTableCellElement;
        tableDataAsName.classList.add('check-list-name');

        let checkCell: HTMLInputElement = document.createElement('input') as HTMLInputElement;
        checkCell.classList.add('check-list-checkbox');
        checkCell.type = "checkbox";
        checkCell.dataset.listId = element.check_list_id.toString();
        checkCell.addEventListener('input', ()=>{
            selectedDeleteCheckList.push(Number(checkCell.dataset.listId))
        });

        let nameButton: HTMLButtonElement = document.createElement('button') as HTMLButtonElement;
        nameButton.type = 'button';
        nameButton.classList.add('check-list-item-button');

        tableDataAsName.appendChild(nameButton);
        tableDataAsCheck.appendChild(checkCell);
        tableLine.appendChild(tableDataAsCheck);
        tableLine.appendChild(tableDataAsName);

        tableBody?.appendChild(tableLine);
        console.log(tableLine);
    })
}

window.addEventListener('load', async()=>{
    // 新規追加ボタンのイベントの設定を行う
    let addCheckListButton:HTMLButtonElement = document.querySelector('.action-button--add') as HTMLButtonElement;
    console.log(addCheckListButton);
    addCheckListButton.addEventListener('click', ()=>{
        location.replace("./EditCheckList.html")
    });

    // 削除ボタンのイベント設定を行う
    let deleteCheckListButton: HTMLButtonElement = document.querySelector('.action-button--delete') as HTMLButtonElement;
    deleteCheckListButton.addEventListener('click', async() => {
        await DeleteMultiCHeckList(selectedDeleteCheckList);
    })

    // ページングをするボタンの設定を行う
    let upPageButton: HTMLButtonElement = document.querySelector('.up-page') as HTMLButtonElement;
    upPageButton.addEventListener('click', async()=>{
        nowPageNumber++;
        await GetCheckList(nowPageNumber, searchString);
    })

    // ページングをするボタンの設定を行う
    let downPageButton: HTMLButtonElement = document.querySelector('.down-page') as HTMLButtonElement;
    downPageButton.addEventListener('click', async()=>{
        nowPageNumber--;
        await GetCheckList(nowPageNumber, searchString);
    })

    // 検索ボタンの設定を行う
    let searchCHeckList: HTMLButtonElement = document.querySelector('.search-button') as HTMLButtonElement;
    searchCHeckList.addEventListener('click', async() =>{
        let searchInput: HTMLInputElement = document.querySelector('.search-input') as HTMLInputElement;
        nowPageNumber = 1;
        searchString = searchInput.value;
        await GetCheckList(nowPageNumber ,searchString);
    })

    // 初期表示
    await GetCheckList(nowPageNumber, searchString);
})