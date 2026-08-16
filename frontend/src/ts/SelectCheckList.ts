type CheckListData = {
  check_list_id: string,
  check_list_name: string,
  check_list: string
}

// テストデータ
const checkListDataList: CheckListData[] = [
  {
    check_list_id: "CH00000",
    check_list_name: "買い物リスト",
    check_list: JSON.stringify(["牛乳", "卵", "パン", "コーヒー豆"])
  },
  {
    check_list_id: "CH00001",
    check_list_name: "持ち物リスト",
    check_list: JSON.stringify(["パスポート", "航空券", "財布", "スマホ", "充電器"])
  },
  {
    check_list_id: "CH00002",
    check_list_name: "今日のToDo",
    check_list: JSON.stringify(["資料作成", "会議参加", "メール返信"])
  }
];

// 画面開始時にAPIを実行してデータを取得する
window.addEventListener("load", async () => {
  // APIを実行してチェックリストのデータを取得する
  // const response = await fetch('http://localhost:8080/api/CheckList', {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: null
  // });

  // レスポンスが成功だったらチェックリスト選択テーブルを作成する
  // if(response.ok){
  if(checkListDataList){
    // const checkListData: CheckListData[] = await response.json();

    if(checkListDataList != null){
      // body要素を取得
      let body: HTMLBodyElement = document.getElementsByTagName("body")[0];

      // チェックリスト選択テーブルの作成
      let table: HTMLTableElement = document.createElement("table");

      // チェックリスト選択テーブルのヘッダー
      let thead: HTMLTableSectionElement = document.createElement("thead");

      // ヘッダーの内容
      let th: HTMLTableCellElement = document.createElement('th');
      th.textContent = "チェックリスト名"
      thead.appendChild(th);
      table.appendChild(thead);

      // チェックリスト選択テーブルのボディ
      let tbody: HTMLTableSectionElement = document.createElement("tbody");

      // チェックリスト選択行の作成
      checkListDataList.forEach(data =>{
        let tr: HTMLTableRowElement = document.createElement("tr");
        let td: HTMLTableCellElement = document.createElement("td");
        let button: HTMLButtonElement = document.createElement("button");

        // ボタンの設定をする
        button.textContent = data.check_list_name;
        button.classList.add(data.check_list_id.toString());

        // ボタンを押下するとチェックリストを出すようにする
        button.addEventListener('click', ()=>{
          sessionStorage.setItem("ListId", data.check_list_id);
          window.location.replace("./CheckList.html");
        })

        td.appendChild(button);
        tr.appendChild(td);
        tbody.appendChild(tr);
      })

      table.appendChild(tbody);
      body.appendChild(table);
    }
  }
})