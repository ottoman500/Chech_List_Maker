// チェックリスト一覧のデータ型
type CheckListName = {
    check_list_id : number;
    check_list_name : string;
}

// 削除対象のチェックリスト
let selectedDeleteCheckListId: number[] = [];
let selectedDeleteCheckList: HTMLInputElement[] = [];

// 現在のページ数
let nowPageNumber: number = 1;

// 検索文字列
let searchString: string = "";

// 選択されたチェックリストの削除を行う
let DeleteMultiCheckList = async(selectedList: number[]) =>{
    try{
        const response = await fetch("http://localhost:8080/api/DeleteSelectedList", {
            method:"DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({list:selectedList})
        });
        if(!response.ok){
            alert("削除に失敗しました")
        }
        else{
            alert("削除に成功しました")
            nowPageNumber = 0;
            searchString = "";
            GetCheckList(nowPageNumber, searchString);
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
        var params = new URLSearchParams({
            page_number: pageNumber.toString(),
            search_string: searchString
        }).toString();

        const response = await fetch(`http://localhost:8080/api/GetCheckList?${params}`, {
            method:"GET"
        })
        if(!response.ok){
            alert("一覧の取得に失敗しました")
        }
        else{
            var getListName = await response.json();
            ShowCheckList(getListName);
        }
    }catch(error){
        console.log(error);      
    }
}

// チェックリスト一覧を表示する
let ShowCheckList = (checkListName: CheckListName[]) =>{
        let tableBody = document.querySelector('tbody') as HTMLTableSectionElement;
        tableBody.replaceChildren();

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
            for(let index = 0; index < selectedDeleteCheckList.length; index++){
                let deleteCheckListButton: HTMLButtonElement = document.querySelector('.action-button--delete') as HTMLButtonElement;
                if(selectedDeleteCheckList[index].checked){
                    selectedDeleteCheckListId.length = 0;
                    selectedDeleteCheckList.forEach(item =>{
                        if(item.checked){
                            selectedDeleteCheckListId.push(Number(item.dataset.listId));
                        }
                    })
                    deleteCheckListButton.disabled = false;
                    console.log(selectedDeleteCheckListId);
                    break;
                }
                else{
                    selectedDeleteCheckListId.length = 0;
                    deleteCheckListButton.disabled = true;
                }
            }
        });
        selectedDeleteCheckList.push(checkCell);

        let nameButton: HTMLButtonElement = document.createElement('button') as HTMLButtonElement;
        nameButton.type = 'button';
        nameButton.textContent = element.check_list_name;
        nameButton.classList.add('check-list-item-button');
        nameButton.addEventListener('click', ()=>{
            window.localStorage.setItem('checkListId', element.check_list_id.toString());
            location.replace("./CheckList.html");
        })

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
        await DeleteMultiCheckList(selectedDeleteCheckListId);
    })

    // ページングをするボタンの設定を行う
    let upPageButton: HTMLButtonElement = document.querySelector('.up-page') as HTMLButtonElement;
    let downPageButton: HTMLButtonElement = document.querySelector('.down-page') as HTMLButtonElement;
    downPageButton.disabled = true;
    
    upPageButton.addEventListener('click', async()=>{
        nowPageNumber++;
        if(nowPageNumber > 1){
            downPageButton.disabled = false;
        }
        await GetCheckList(nowPageNumber, searchString);
    })

    // ページングをするボタンの設定を行う
    downPageButton.addEventListener('click', async()=>{
        nowPageNumber--;
        if(nowPageNumber == 1){
            downPageButton.disabled = true;
        }
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