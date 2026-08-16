import type {CheckList, SelectedCheckList} from './type'
import {GetCheckListAccesser, GetSelectedCheckListAccesser, RegisterCheckListAccesser, DeleteCheckListAccesser} from './Accesser'

export let GetCheckList = async(pageNumber: number): Promise<CheckList[]> =>{
    let checkList: CheckList[] = [];
    try{
        checkList = await GetCheckListAccesser(pageNumber);
    }catch{
        console.log("一覧の取得に失敗しました");
    }
    return checkList;
}

export let GetSelectedCheckList = async(checkListNumber: number): Promise<SelectedCheckList> =>{
    let selectedCheckList: SelectedCheckList = {
        selected_check_list_id: 0,
        check_list_name: "",
        check_list_info: []
    }

    try{
        selectedCheckList = await GetSelectedCheckListAccesser(checkListNumber);
    }
    catch{
        console.log("チェックリストの取得に失敗しました");
    }

    return selectedCheckList;
}

export let RegisterCheckList = async(checkList: SelectedCheckList) =>{
    try{
        await RegisterCheckListAccesser(checkList);
    }
    catch{
        console.log("チェックリストの登録に失敗しました");
    }
}

export let DeleteCheckList = async(checkListNumber: number) =>{
    try{
        await DeleteCheckListAccesser(checkListNumber);
    }
    catch{
        console.log("チェックリストの削除に失敗しまいた");
    }
}