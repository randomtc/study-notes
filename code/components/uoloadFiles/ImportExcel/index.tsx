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
/**
 * @param  name: 指定上传文件的参数名称。在这个示例中，上传的文件将在POST请求中作为file参数发送到服务器。
 * @param  action: 指定处理上传文件的服务器端API的URL。在这个示例中，服务器端API的URL是/api/family-bed/user/importElder。
 * @param  accept: 指定允许上传的文件类型。在这个示例中，允许上传.xls、.xlsx和.csv文件。
 * @param  maxCount: 指定允许上传的最大文件数量。在这个示例中，只允许上传一个文件。
 * @param  data: 指定上传文件时需要传递的其他数据。在这个示例中，我们向服务器传递了一个名为source的参数，它的值是一个字符串，包含了上传文件的日期信息。
 * @param  beforeUpload: 在上传之前的回调函数，它接收一个文件对象参数。在这个示例中，我们在上传之前调用了一个函数getFileList，用于在上传之前向父组件传递文件信息，并阻止了默认的上传行为（因为我们需要在上传之前处理文件）。
 **/

    //开始扫码分析
    function decodeFromInputVideoFunc(firstDeviceId) {
      // firstDeviceId  为null 时默认选择面向环境的摄像头
      codeReader.decodeFromVideoDevice(firstDeviceId, 'video',
          async (result, err) => {
              if (result) { 
              /**************扫码成功后做业务逻辑***********/
             
              }
              if (err) {
                  // console.error(err);
              }
          }
      )
  }
