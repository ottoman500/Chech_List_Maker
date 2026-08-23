import express from 'express';
import type { CheckList, SelectedCheckList } from './type';
import {GetCheckList, GetSelectedCheckList, RegisterCheckList, DeleteCheckList} from './Service'
import cors from 'cors';
const app = express();
const port = 8080;
app.use(cors());

app.use(express.json());

app.get('/api/GetCheckList', async(req, res) => {
    let pageNumber: number = Number(req.query.page_number);
    let searchString: string= typeof req.query.search_string === 'string' ? req.query.search_string : "";
    let responseData: CheckList[] = await GetCheckList(pageNumber, searchString);
    res.json(responseData);
});

app.get('/api/SelectedCheckList', async(req, res) => {
    let checkListNumber: number = Number(req.query.check_list_id);
    let responseData: SelectedCheckList = await GetSelectedCheckList(checkListNumber);
    res.json(responseData);
})

app.post('/api/RegisterCheckListDetail', async(req, res) => {
    let checkListDetail: SelectedCheckList = req.body;
    await RegisterCheckList(checkListDetail);
})

app.delete('/api/DeleteSelectedList', async(req, res)=>{
    let checkListNumber: number = req.body.list;
    await DeleteCheckList(checkListNumber);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});