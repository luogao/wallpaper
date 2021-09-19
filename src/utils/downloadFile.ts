import base64Img2Blob from "./base64Img2Blob"

function downloadFile (fileName: string, content: any) {
  var aLink = document.createElement('a')
  var blob = base64Img2Blob(content) //new Blob([content]);
  aLink.download = fileName
  aLink.href = URL.createObjectURL(blob)
  aLink.click()
}

export default downloadFile