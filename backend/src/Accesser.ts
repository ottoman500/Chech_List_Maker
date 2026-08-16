import type {CheckList, SelectedCheckList} from './type'

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'testdb',
  password: 'password',
  port: 5432,
});

export let GetCheckListAccesser = async(pageNumber: number): Promise<CheckList[]> =>{
    let query: string = 'select check_list_name, check_list_info from CheckListTable';
    let getData: CheckList[] = [];
    try{
        getData = await Pool.query(query);
    }
    catch{
        console.log("データの取得に失敗しました");
    }
    return  getData;
}

export let GetSelectedCheckListAccesser = async(checkListNumber: number): Promise<SelectedCheckList> =>{
    let query: string = `select * from CheckListTable where id = '${checkListNumber}`;
    let getData: SelectedCheckList = {
        selected_check_list_id: 0,
        check_list_name: "",
        check_list_info: []
    }

    try{
        getData = await Pool.query(query);
    }
    catch{
        console.log("データの取得に失敗しまいた");
    }
    return getData;
}

export let RegisterCheckListAccesser = async(checkList: SelectedCheckList) =>{
    let query: string = "";
    if(checkList.selected_check_list_id == 0){
        query = `insert into CheckListTable (check_list_name, check_list_info) value ('${checkList.check_list_name}', '${checkList.check_list_info}')`
    }
    else{
        query = `update table CheckListTable set check_list_name, check_list_info to '${checkList.check_list_name}', '${checkList.check_list_info}'`
    }

    try{
        await pool.query(query);
    }
    catch{
        console.log("データの登録に失敗しました");
    }
}

export let DeleteCheckListAccesser = async(checkListNumber: number) =>{
    try{
        let query: string = `delete CheckList where id = '${checkListNumber}'`;
        pool.query(query);
    }
    catch{
        console.log("データの削除に失敗しました");
    }
}