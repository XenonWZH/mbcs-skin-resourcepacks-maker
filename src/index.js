const electron = require("electron");
const { dialog } = electron.remote;
const path = require("path");
const fs = require("fs");
const os = require("os");

var mcSkin, mcFile, mcVer, resLogo, resName;
var osPath = os.platform() == "win32" ? "\\" : "/";

document.getElementById("mc-skin").addEventListener("click", function () {
  dialog
    .showOpenDialog({
      title: "请选择文件",
      filters: [{ name: "Images", extensions: ["png"] }],
      properties: ["openFile"],
    })
    .then((result) => {
      if (result.filePaths != "") {
        document.getElementById("skin-path").innerHTML = result.filePaths;
        mcSkin = result.filePaths[0];
      }
    })
    .catch((err) => {
      dialog.showMessageBox({
        title: "Error",
        type: "error",
        message: err,
      });
    });
});

document.getElementById("mc-file").addEventListener("click", function () {
  dialog
    .showOpenDialog({
      title: "请选择文件夹",
      properties: ["openDirectory"],
    })
    .then((result) => {
      if (result.filePaths != "") {
        document.getElementById("mc-path").innerHTML = result.filePaths;
        mcFile = result.filePaths;
        console.log(result.filePaths);
      }
    })
    .catch((err) => {
      dialog.showMessageBox({
        title: "Error",
        type: "error",
        message: err,
      });
    });
});

document.getElementById("mc-version").addEventListener("click", function () {
  mcVer = document.getElementById("mc-version").value;
});

document.getElementById("res-logo").addEventListener("click", function () {
  dialog
    .showOpenDialog({
      title: "请选择文件",
      filters: [{ name: "Images", extensions: ["png"] }],
      properties: ["openFile"],
    })
    .then((result) => {
      if (result.filePaths != "") {
        document.getElementById("logo-path").innerHTML = "请选择文件";
        document.getElementById("logo-path").innerHTML = result.filePaths;
        resLogo = result.filePaths[0];
      }
    })
    .catch((err) => {
      dialog.showMessageBox({
        title: "Error",
        type: "error",
        message: err,
      });
    });
});

document.getElementById("res-name").addEventListener("input", function () {
  resName = document.getElementById("res-name").value;
});

document.getElementById("make-res").addEventListener("click", function () {
  if (resName == undefined || resName == "") {
    resName = "MBCS皮肤材质包";
  }
  if (resLogo == undefined) {
    resLogo = "." + osPath + "image" + osPath + "pack.png";
  }
  if (mcVer == undefined) {
    mcVer = "1";
  }
  if (!fs.existsSync(mcFile + osPath + resName)) {
    fs.mkdir(mcFile + osPath + resName, function (err) {
      if (err) {
        dialog.showMessageBox({
          title: "Error",
          type: "error",
          message: err,
        });
      }
    });
    fs.writeFile(
      mcFile + osPath + resName + osPath + "pack.mcmeta",
      '{\n\
  "pack": {\n\
    "pack_format": ' +
        mcVer +
        ',\n\
    "description": "\\u00A76M\\u00A7aB\\u00A7dC\\u00A7cS\\u00A7e皮\\u00A74肤\\u00A72材\\u00A7b质\\u00A73包"\n\
  }\n\
}\n',
      function (err) {
        if (err) {
          dialog.showMessageBox({
            title: "Error",
            type: "error",
            message: err,
          });
        }
      }
    );
    fs.writeFileSync(
      mcFile + osPath + resName + osPath + "pack.png",
      fs.readFileSync(resLogo)
    );
    fs.mkdir(mcFile + osPath + resName + osPath + "assets", function (err) {
      if (err) {
        dialog.showMessageBox({
          title: "Error",
          type: "error",
          message: err,
        });
      }
    });
    fs.mkdir(
      mcFile + osPath + resName + osPath + "assets" + osPath + "minecraft",
      function (err) {
        if (err) {
          dialog.showMessageBox({
            title: "Error",
            type: "error",
            message: err,
          });
        }
      }
    );
    fs.mkdir(
      mcFile +
        osPath +
        resName +
        osPath +
        "assets" +
        osPath +
        "minecraft" +
        osPath +
        "textures",
      function (err) {
        if (err) {
          dialog.showMessageBox({
            title: "Error",
            type: "error",
            message: err,
          });
        }
      }
    );
    fs.mkdir(
      mcFile +
        osPath +
        resName +
        osPath +
        "assets" +
        osPath +
        "minecraft" +
        osPath +
        "textures" +
        osPath +
        "entity",
      function (err) {
        if (err) {
          dialog.showMessageBox({
            title: "Error",
            type: "error",
            message: err,
          });
        }
      }
    );
    fs.writeFileSync(
      mcFile +
        osPath +
        resName +
        osPath +
        "assets" +
        osPath +
        "minecraft" +
        osPath +
        "textures" +
        osPath +
        "entity" +
        osPath +
        "steve.png",
      fs.readFileSync(mcSkin)
    );
    fs.writeFileSync(
      mcFile +
        osPath +
        resName +
        osPath +
        "assets" +
        osPath +
        "minecraft" +
        osPath +
        "textures" +
        osPath +
        "entity" +
        osPath +
        "alex.png",
      fs.readFileSync(mcSkin)
    );
    dialog.showMessageBox({
      title: "MBCS皮肤材质包生成器",
      type: "info",
      message: "材质包生成成功\n请将文件夹复制到材质包文件夹下",
    });
  } else {
    dialog.showMessageBox({
      title: "MBCS皮肤材质包生成器",
      type: "error",
      message: "材质包文件夹已存在",
    });
  }
});
