const fs = require('fs');
const path = require('path');
const axios = require('axios');

const aritpub = () => {
  const dir = "source/_posts/";
  const filename = getMostRecentFile(dir);
  const filepath = dir + filename;
  const content = deleteHead(fs.readFileSync(filepath, 'utf-8'));
  const data = {
    "title": filename,
    "content": content
  }
  // console.log(data);
  const aritcleIdFile = 'articleid.md';
  const aritcleId = getAritcleId(aritcleIdFile);

  if (aritcleId != "null" && judgeArticleUpdated(aritcleId, filename)) {
    updateArticle(data, aritcleId, aritcleIdFile);
  } else {
    addArticle(data, aritcleIdFile);
  }
    
}

const deleteHead = (content) => {
  const reg = /---(.|[\n])*?---/g;
  const matchArr = content.match(reg);
  // console.log(matchArr);
  if (matchArr !== null) {
    const note = content.match(reg)[0];
    content = content.replace(note, "");
  }
  return content;
}

// 判断此时上传的文章是否已上传, true 已经上传， false 没有上传
const judgeArticleUpdated = async (aritcleId, filename) => {
  const url = "http://192.144.169.17:3000/articles/" + aritcleId;
  const resp = await axios.get(url);
  // console.log(resp);
  return resp.data.data.title == filename;
}

const addArticle = (data, aritcleIdFile) => {
  const url = "http://192.144.169.17:3000/articles";
  axios.put(url, data)
    .then(function (resp) {
      console.log("新增文章：" + resp.data.data.title);
      console.log("新文章 id：" + resp.data.data._id);
      fs.writeFileSync(aritcleIdFile, resp.data.data._id);
    })
    .catch(function (error) {
      // console.error(error);
      console.log("新增文章出错，请查看后端 /articles 接口是否可以访问！");
    });
}


const updateArticle = (data, aritcleId, aritcleIdFile) => {
  const url = "http://192.144.169.17:3000/articles/" + aritcleId;
  axios.post(url, data)
    .then(function (resp) {
      console.log("更新文章：" + resp.data.data.title);
      console.log("更新状态：" + resp.data.status)
    })
    .catch(function (error) {
      // console.error(error);
      console.log("更新文章出错，可能文章已删除！");
      fs.writeFileSync(aritcleIdFile, "null");
      console.log("已将文章 id 置为 null");
    });
}

const getMostRecentFile = (dir) => {
  const files = orderReccentFiles(dir);
  return files.length ? files[0].file : undefined;
};

const orderReccentFiles = (dir) => {
  return fs.readdirSync(dir)
    .filter(file => fs.lstatSync(path.join(dir, file)).isFile())
    .map(file => ({ file, mtime: fs.lstatSync(path.join(dir, file)).mtime }))
    .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
};

const getAritcleId = (aritcleIdFile) => {
  return fs.readFileSync(aritcleIdFile, 'utf-8');
};

aritpub();