import { Button, Modal, Form, Upload } from "antd"
import dayjs from "dayjs"
interface Props {
  open?: boolean
  xlsName?: string
  confirmLoading?: boolean
  onConfirmImport?: (...set: any) => void
  onCancel?: (...set: any) => void
  getFileList?: (...set: any) => void
  downloadTemplate?: (...set: any) => void
}
export default function ImportModal(props: Props) {
  const {
    open,
    xlsName,
    confirmLoading,
    onConfirmImport,
    onCancel,
    getFileList,
  } = props

  return (
    <Modal
      title={xlsName ? xlsName : "导入"}
      open={open}
      onCancel={() => onCancel!()}
      okText="确认"
      cancelText="取消"
      onOk={onConfirmImport}
      destroyOnClose={true}
      confirmLoading={confirmLoading}
    >
      <Form colon={false} labelCol={{ span: 6 }} wrapperCol={{ md: 24 }}>
        <Form.Item label="Excel表格">
          <Button type="link" onClick={() => props.downloadTemplate!()}>
            下载导入格式样例表格
          </Button>
        </Form.Item>

        <Form.Item label="上传Excel" wrapperCol={{ offset: 1 }}>
          <Upload
            name="file"
            action={`/api/family-bed/user/importElder`}
            accept=".xls, .xlsx, .csv"
            maxCount={1}
            data={{
              source: `import_excel/${dayjs().format(
                "YYYY-MM"
              )}/${dayjs().date()}`,
            }}
            beforeUpload={(file) => {
              getFileList!(file)
              return false
            }}
          >
            <Button type="primary">选择文件</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}
// 这是一个基于Ant Design的<Upload>组件的示例代码。以下是每个属性的说明：
// name: 指定上传文件的参数名称。在这个示例中，上传的文件将在POST请求中作为file参数发送到服务器。
// action: 指定处理上传文件的服务器端API的URL。在这个示例中，服务器端API的URL是/api/family-bed/user/importElder。
// accept: 指定允许上传的文件类型。在这个示例中，允许上传.xls、.xlsx和.csv文件。
// maxCount: 指定允许上传的最大文件数量。在这个示例中，只允许上传一个文件。
// data: 指定上传文件时需要传递的其他数据。在这个示例中，我们向服务器传递了一个名为source的参数，它的值是一个字符串，包含了上传文件的日期信息。
// beforeUpload: 在上传之前的回调函数，它接收一个文件对象参数。在这个示例中，我们在上传之前调用了一个函数getFileList，用于在上传之前向父组件传递文件信息，并阻止了默认的上传行为（因为我们需要在上传之前处理文件）。
// 注意，上面的代码是一个示例，实际使用时您需要根据您的需求进行修改。特别是action和data属性的值应该根据您的实际情况进行更改，以确保它们正确地指向您的服务器API并包含您需要上传的数据。
