import type {CheckList, SelectedCheckList} from './type'

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgresql',
  port: 5432,
});

export let GetCheckListAccesser = async(pageNumber: number, searchString: string): Promise<CheckList[]> =>{
    let query: string = "";
    let checkListData: CheckList[] = [];

    if(searchString == ""){
        query = 'select id, name from check_list_table order by id';
    }
    else {
        query = `select id, name from check_list_table where name like '%${searchString}%' order by id;`;
    }

    try{
        var getListData = await pool.query(query);
        let count: number = 0;
        console.log(getListData.rows.length)
        if((pageNumber * 10) < getListData.rows.lngth){
            for(let index = (pageNumber - 1) * 10; index < getListData.rows.length; index++){
                count++;
                checkListData.push({
                    check_list_id:getListData.rows[index].id,
                    check_list_name:getListData.rows[index].name
                })
                if(count == 10 || count == (getListData.length - (pageNumber * 10))){
                    break;
                }
            }
        }
    }
    catch(error){
        console.log(error);
    }
    return  checkListData;
}

export let GetSelectedCheckListAccesser = async(checkListNumber: number): Promise<SelectedCheckList> =>{
    let query: string = `select * from check_list_table where id = ${checkListNumber}`;
    let getData: SelectedCheckList = {
        selected_check_list_id: 0,
        check_list_name: "",
        check_list_info: []
    }

    try{
        const result = await pool.query(query);
        console.log(result);
        getData = {
            selected_check_list_id: result.rows[0].id,
            check_list_name: result.rows[0].name,
            check_list_info: result.rows[0].check_list_info.split(",")
        }
    }
    catch(error){
        console.log("データの取得に失敗しました");
        console.log(error)
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
        let query: string = `delete from check_list_table where id in (${checkListNumber})`;
        pool.query(query);
    }
    catch{
        console.log("データの削除に失敗しました");
    }
}