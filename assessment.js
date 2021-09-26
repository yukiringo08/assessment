'use strict';
const userNameInput =document.getElementById('user-name');//入力エリア
const assessmentButton = document.getElementById('assessment');//診断エリア
const resultDivided = document.getElementById('result-area');//結果表示エリア
const tweetDivided = document.getElementById('tweet-area');//ツイートボタンエリア
//ボタンが押された時の処理
assessmentButton.onclick = function(){
  const userName = userNameInput.value;//ユーザー入力を取得
if(userName.length === 0){
  return;//　入力が空だったら処理を中断
}

//▼▼　今ある診断結果を削除する ▼▼
//診断結果表示エリアの子要素がある限りループする
while(resultDivided.firstChild){
//診断結果表示エリアの最初の子要素を削除する
resultDivided.removeChild(resultDivided.firstChild);
}

   //診断を実行して結果を表示する
   const header = document.createElement('h3');
   header.innerText ='診断結果';
   resultDivided.appendChild(header);
    const paragraph = document.createElement('p');//ｐタグを新しく作る
    const result = assessment(userName);//pタグに診断結果を設定する
    paragraph.innerText=result;
    resultDivided.appendChild(paragraph);


   //TODO　ツイートボタンを設置する
   tweetDivided.innerText="";
   const anchor = document.createElement('a');
   const hrefValue = 
       'https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw';
   anchor.setAttribute('href',hrefValue);
   anchor.className = 'twitter-hashtag-button';
   anchor.setAttribute('data-text', '診断結果の文章');
   anchor.innerText = 'Tweet #あなたのいいところ';

   tweetDivided.appendChild(anchor);

   //widgets.jsの設定
   const script = document.createElement('script');
   script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
   tweetDivided.appendChild(script);
  };

  userNameInput.onkeydown = event => {
    if (event.key === 'Enter'){
      assessmentButton.onclick();
    }
  }



const answers = [
  '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
  '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
  '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
  '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
  '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
  '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
  '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
  '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
  '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
  '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
  '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
  '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
  '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
  '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
  '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
  '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
  '{userName}のいいところは優しさです。あなたの優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }
 // 文字のコード番号の合計を回答の数で割って添字の数値を求める
 const index = sumOfCharCode % answers.length;
 let result = answers[index];

 result = result.replaceAll('{userName}', userName);
 return result;
}
