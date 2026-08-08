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

window.addEventListener('load', async() =>{
    // // セッションストレージからチェックリストIDを取得してAPIから情報を取得する
    // let checkListId:string = sessionStorage.getItem('ListId')!;
    // const response = await fetch('http://localhost:8080/api/CheckListInfo', {
    //     method:'GET',
    //     headers:{
    //         'Content-Type': 'application/json'
    //     },
    //     body:JSON.stringify({id:checkListId})
    // })

    // if(response.ok){
         makeCheckList();
         makeButton();
    // }
})

let makeCheckList = () =>{
    // チェックリスト情報を取得
    // let checkListInfo = response.json();
    let checkList:string[] = JSON.parse(checkListInfo.check_list) as string[];

    // チェックリストを作成する
    let bodyElement:HTMLBodyElement = document.body as HTMLBodyElement;
    let checkListView: HTMLDivElement = document.createElement('div') as HTMLDivElement;
    let list: HTMLUListElement = document.createElement('ul') as HTMLUListElement;
    list.classList.add('check_list')

    checkList.forEach(element =>{
        let checkElement:HTMLInputElement = document.createElement('input') as HTMLInputElement;
        let checkLabel: HTMLLabelElement = document.createElement('label') as HTMLLabelElement;
        let listElement: HTMLLIElement = document.createElement('li') as HTMLLIElement;

        checkElement.type = 'checkbox';
        checkElement.id = element;

        checkLabel.textContent = element as string;
        checkLabel.htmlFor = element as string;

        listElement.appendChild(checkElement);
        listElement.appendChild(checkLabel);

        list.appendChild(listElement);
    })
    checkListView.appendChild(list);
    bodyElement.appendChild(checkListView);
}

let makeButton = () =>{
    let backPageButton = document.createElement('button') as HTMLButtonElement;
    let editPageButton = document.createElement('button') as HTMLButtonElement;

    backPageButton.addEventListener('click', ()=>{
        window.location.replace('./SelectCheckList.html')
    })
    backPageButton.textContent = '戻る'

    editPageButton.addEventListener('click', ()=>{
        window.location.replace('./EditCheckList.html')
    })
    editPageButton.textContent = '編集'

    let bodyElement:HTMLBodyElement = document.body as HTMLBodyElement;
    bodyElement.appendChild(backPageButton);
    bodyElement.appendChild(editPageButton)
}