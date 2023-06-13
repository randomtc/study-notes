import { FC useState } from "react"
import { useSelector } from "react-redux"
import { saveAs } from "file-saver"
import xlsxUrl from "@/assets/oldman.xlsx"
import ImportExcel from './ImportExcel'
const Index: FC = () => {
  const org_id = useSelector<any>((state) => state.user.cur_id)
  const [importObj, setImportObj] = useState<Record<string, any>>({
    isImportModal: false,
    isImportLoading: false,
    file: null,
  })
  //导入表格
  async function onConfirmImport() {
    setImportObj({ ...importObj, isImportLoading: true })
    const formData = new FormData()
    formData.append("file", importObj?.fileList)
    formData.append("org_id", org_id as string)
    const res = await importEcect(formData) //导入接口
    if (res?.code === 200) {
      setTimeout(() => {
        message.success(res?.message, 2)
        setImportObj({ ...importObj, isImportModal: false })
        setReq(!isReq)
      }, 1200)
    } else if (res === undefined) {
      setImportObj({ ...importObj, isImportLoading: false })
    }
  }

  return (
    <>
      <Button
        type="link"
        onClick={() => setImportObj({ ...importObj, isImportModal: true })}
      >
        批量导入老人
      </Button>
      <ImportExcel
        xlsName="老人导入模板"
        open={importObj.isImportModal}
        confirmLoading={importObj.isImportLoading}
        downloadTemplate={() => {
          //下载表格
          fetch(xlsxUrl) //文件存放路径
            .then((response) => response.blob())
            .then((blob) => saveAs(blob, "老人导入模版.xlsx")) // 指定下载后的文件名
            .catch((error) => console.error(error))
        }}
        onConfirmImport={onConfirmImport}
        onCancel={() => setImportObj({ ...importObj, isImportModal: false })}
        getFileList={(file) => setImportObj({ ...importObj, fileList: file })}
      />
    </>
  )
}

export default Index
