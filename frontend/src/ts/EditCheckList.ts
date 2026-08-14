type CheckListDetail = {
    selected_check_list_id: number;
    check_list_name: string;
    check_list_info: string[];
}

window.addEventListener('load', async()=>{
    // 追加ボタンの設定
    let addButton: HTMLButtonElement = document.querySelector('header-button-add') as HTMLButtonElement;
    addButton.addEventListener('click', ()=>{
        let checkListTable: HTMLDivElement = document.querySelector('checklist-table') as HTMLDivElement;

        let checkListTableCell: HTMLDivElement = document.createElement('div') as HTMLDivElement;
        checkListTableCell.classList.add('checklist-row');

        let inputElement: HTMLInputElement = document.createElement('input') as HTMLInputElement;
        inputElement.classList.add('checklist-item');
        inputElement.type = 'text';

        checkListTableCell.appendChild(inputElement);
        checkListTable.appendChild(checkListTableCell);
    })

    // 削除ボタンの設定
    let deleteButton: HTMLButtonElement = document.querySelector('header-button-delete') as HTMLButtonElement;
    deleteButton.addEventListener('click', ()=>{
        let checkListTable: HTMLDivElement = document.querySelector('checklist-table') as HTMLDivElement;

        if(checkListTable.lastElementChild != null){
            checkListTable.removeChild(checkListTable.lastElementChild);
        }
    })

    // 保存ボタンの設定
    let saveButton: HTMLButtonElement = document.querySelector('footer-button-save') as HTMLButtonElement;
    saveButton.addEventListener('click', async()=>{
        let tableElement: HTMLDivElement = document.querySelector('checklist-table') as HTMLDivElement;
        let checkList: string[] = [];

        for(let index:number = 0; index < tableElement.children.length; index++){
            let inputElement: HTMLInputElement = tableElement.children[index].children[0] as HTMLInputElement;
            checkList.push(inputElement.value);
        }

        // チェックリストの登録
        let checkListId: number = Number(window.localStorage.getItem('checkListId'));
        try{
            let response = await fetch("http://localhost:8080/api/RegisterCheckListDetail", {
                method:"POST",
                body: JSON.stringify({ListId:checkListId, checkList})
            });
        }catch(error){
            alert("保存に失敗しました");
            console.log(error);
        }
    })

    // 戻るボタンの設定
    let backButton: HTMLButtonElement = document.querySelector('footer-button-back') as HTMLButtonElement;
    backButton.addEventListener('click', ()=>{
        let checkListId: string | null= window.localStorage.getItem('checlListId');

        if(checkListId != null && checkListId != ""){
            window.location.replace('./EditCheckList.html');
        }
        else{
            window.location.replace('./SelectCheckList.html');
        }
    })

    // チェックリスト一覧
    let checkListDetail = await GetCheckListDetail();

    if(checkListDetail != null){
        // 一覧表示
        ShowCheckList(checkListDetail);
    }
})

// チェックリスト詳細取得
let GetCheckListDetail = async():Promise<CheckListDetail | null> => {
    let checkListDetail: CheckListDetail | null= null;
    if(window.localStorage.getItem('checkListId')){
        try{
            let response = await fetch("http://localhost:8080/api/GetCheckListDetail", {
                method:"GET",
                body: JSON.stringify({checkListId:Number(window.localStorage.getItem('checkListId'))})
            })

            if(response.ok){
                checkListDetail = await response.json();
            }
        }catch{
            alert("チェックリストの取得に失敗しました");
        }
    }

    return checkListDetail;
}

// 一覧表示
let ShowCheckList = (checkListDetail: CheckListDetail) =>{
    let checkListTable: HTMLDivElement = document.querySelector('checklist-table') as HTMLDivElement;
    checkListDetail.check_list_info.forEach(value =>{
        let checkListRow: HTMLDivElement = document.createElement('div') as HTMLDivElement;
        checkListRow.classList.add('checklist-row');
        
        let inputElement: HTMLInputElement = document.createElement('input') as HTMLInputElement;
        inputElement.classList.add('checklist-item');
        inputElement.type = "text";
        inputElement.value = value;

        checkListRow.appendChild(inputElement);
        checkListTable.appendChild(checkListRow);
    })
}