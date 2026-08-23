type CheckListDetail = {
    selected_check_list_id: number,
    check_list_name: string,
    check_list_info: string[]
}

// 進捗率の計算のための配列
let inputArray: HTMLInputElement[] = [];

window.addEventListener('load', async()=>{
    let backSelectButton: HTMLButtonElement = document.querySelector('.back-button') as HTMLButtonElement;
    console.log(backSelectButton);
    backSelectButton.addEventListener('click', ()=>{
        location.replace('./SelectCheckList.html')
    })

    let editButton: HTMLButtonElement = document.querySelector('.edit-button') as HTMLButtonElement;
    editButton.addEventListener('click', ()=>{
        location.replace('./EditCheckList.html')
    })

    await GetCheckListDetail();
})

let GetCheckListDetail = async() =>{
    let checkListId = window.localStorage.getItem("checkListId");

    if(checkListId != null){
        try{
            let response = await fetch(`http://localhost:8080/api/SelectedCheckList?check_list_id=${checkListId}`);

            if(response.ok){
                let checkListDetai: CheckListDetail = await response.json();
                ShowCheckList(checkListDetai);
            }
            else{
                alert("チェックリストの取得に失敗しました");
            }
        }catch{
            alert("チェックリストの取得に失敗しました");
        }
    }
}

let ShowCheckList = (checkListDetail: CheckListDetail) =>{
    let itemCount: number = 0;

    checkListDetail.check_list_info.forEach(element =>{
        itemCount++;

        let checkListItem: HTMLLabelElement = document.createElement('label') as HTMLLabelElement;
        checkListItem.classList.add('checklist-item');

        let checkBoxArea: HTMLDivElement = document.createElement('div') as HTMLDivElement;
        checkBoxArea.classList.add('checkbox-area');

        let checkBox: HTMLInputElement = document.createElement('input') as HTMLInputElement;
        checkBox.type = "checkbox";
        checkBox.id = "item" + itemCount;
        checkBox.classList.add('check-box');
        inputArray.push(checkBox);
        checkBox.addEventListener('change', ()=>{
            let checkedCount: number = 0;

            inputArray.forEach(element => {
                if(element.checked == true){
                    checkedCount++;
                }
            })

            let progressValue: HTMLDivElement = document.querySelector('.progress-value') as HTMLDivElement;
            progressValue.textContent = (checkedCount / inputArray.length) * 100 + '%';
        })

        let checkBoxLabel: HTMLSpanElement = document.createElement('span') as HTMLSpanElement;
        checkBoxLabel.classList.add('check-box-label');

        let itemName: HTMLSpanElement = document.createElement('span') as HTMLSpanElement;
        itemName.classList.add('item-name');
        itemName.textContent = element;

        checkBoxArea.appendChild(checkBox);
        checkBoxArea.appendChild(checkBoxLabel);
        checkListItem.appendChild(checkBoxArea);
        checkListItem.appendChild(itemName);

        let checkListContainer: HTMLElement = document.querySelector('.checklist-container') as HTMLElement;

        checkListContainer.appendChild(checkListItem);
    })
}