type CheckListData = {
  check_list_id: string,
  check_list_name: string,
  check_list: string
}

const checkListInfo: CheckListData = {
    check_list_id: "CH00000",
    check_list_name: "買い物リスト",
    check_list: JSON.stringify(["牛乳", "卵", "パン", "コーヒー豆"])
}

let editList: string[] = [];
let body: HTMLBodyElement = document.body as HTMLBodyElement;
let editView: HTMLDivElement = document.createElement('div') as HTMLDivElement;
let list: HTMLUListElement = document.createElement('ul') as HTMLUListElement;
editView.classList.add('edit-view');
list.classList.add('edit-list');

window.addEventListener('load', ()=>{
    let editCheckList: string | null = window.sessionStorage.getItem('editCheckList') as string | null;
    let response: Promise<Response> | null =  null;
    let addButton: HTMLButtonElement = document.createElement('button') as HTMLButtonElement;
    let deleteButton: HTMLButtonElement = document.createElement('button') as HTMLButtonElement;
    let saveButton: HTMLButtonElement = document.createElement('button') as HTMLButtonElement;

    addButton.textContent = '追加';
    deleteButton.textContent = '削除'

    // 編集リストの作成
    if(editCheckList != null){
        response = fetch('http://localhost:8080/api/GetCheckListInfo', {
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({id:editCheckList})
        })
        makeEditList(response)
    }

    // 追加ボタンの作成
    addButton.addEventListener('click', ()=>{
        let textInput: HTMLInputElement = document.createElement('input') as HTMLInputElement;
        let listElement: HTMLLIElement = document.createElement('li') as HTMLLIElement;

        listElement.appendChild(textInput);
        list.appendChild(listElement);
        body.appendChild(list);
    })

    // 削除ボタンの作成
    deleteButton.addEventListener('click', ()=>{
        let maxLength: number = list.children.length;

        // リストの最後の要素を削除
        if (list.children.length > 0) {
            let lastElement: HTMLLIElement = list.children[maxLength - 1] as HTMLLIElement;
            lastElement?.remove();
        }
    })

    editView.appendChild(addButton);
    editView.appendChild(deleteButton);
    body.appendChild(editView);
})

let makeEditList = (response: Promise<Response> | null) =>{
    editList = JSON.parse(checkListInfo.check_list) as string[];

    editList.forEach(element=>{
        let textInput: HTMLInputElement = document.createElement('input') as HTMLInputElement;
        let listElement: HTMLLIElement = document.createElement('li') as HTMLLIElement;

        textInput.type = 'text';
        textInput.value = element as string;

        listElement.appendChild(textInput);
        list.appendChild(list);
    })
    editView.appendChild(list);
}