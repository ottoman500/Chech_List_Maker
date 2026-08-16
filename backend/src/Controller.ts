import express from 'express';
import type { CheckList, SelectedCheckList } from './type';
import {GetCheckList, GetSelectedCheckList, RegisterCheckList, DeleteCheckList} from './Service'
const app = express();
const port = 8080;

app.use(express.json());

app.get('/Checkist', async(req, res) => {
    let pageNumber: number = Number(req.body.page_number);
    let responseData: CheckList[] = await GetCheckList(pageNumber);
    res.json(responseData);
});

app.get('/SelectedCheckList', async(req, res) => {
    let checkListNumber: number = Number(req.body.check_list_id);
    let responseData: SelectedCheckList = await GetSelectedCheckList(checkListNumber);
    res.json(responseData);
})

app.post('/NewCheckList', async(req, res) => {
    let checkListDetail: SelectedCheckList = req.body;
    await RegisterCheckList(checkListDetail);
})

app.delete('/UnNecessaryCheckList', async(req, res)=>{
    let checkListNumber: number = Number(req.body.check_list_number);
    await DeleteCheckList(checkListNumber);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});