const form = document.querySelector('form');

form.addEventListener('submit', saveBookmark);

function saveBookmark(e){
  e.preventDefault();
  
  const siteName = form['siteName'].value;
  const siteUrl = form['siteUrl'].value;

  if(!validateForm(siteName, siteUrl)){
    return false;
  }

  const bookmark = {
    name: siteName,
    url: siteUrl
  }

  if(localStorage.getItem('bookmarks') === null){
    const bookmarks = [];
    bookmarks.push(bookmark);

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }else{
    const availBK = JSON.parse(localStorage.getItem("bookmarks"));
    
    availBK.push(bookmark);

    localStorage.setItem("bookmarks", JSON.stringify(availBK));
  }

  fetchBookmarks();

  form.reset();
  
  
}


//delete bookmark
function deleteBookmark(url){
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  const newBookmarker = bookmarks.filter(bookmark => {
    return bookmark.url !== url
  })

  localStorage.setItem('bookmarks', JSON.stringify(newBookmarker));

  fetchBookmarks();

}


//fetch bookmarks
function fetchBookmarks(e){
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  let myBookmarks = document.getElementById("myBookmarks");

  myBookmarks.innerHTML = '';

  for(let i = 0; i < bookmarks.length; i++){
    const name = bookmarks[i].name;
    const url = bookmarks[i].url;


    myBookmarks.innerHTML += `<div class="well">
      <h3>${name}
        <a onClick="deleteBookmark(\'${url}\')" class="btn btn-danger float-right" href='#'>Delete</a> 
        <a class="btn btn-primary float-right mr-2" target="_blank" href=${url}>visit</a> 
      </h3>
    </div> <br>`;


  }
}

function validateForm(siteName, siteUrl){
  if (!siteName || !siteUrl) {
    alert('please fill in the form');
    return false;
  }

  const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  const regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert('please input a valid url');
    return false;
  }

  return true;
}