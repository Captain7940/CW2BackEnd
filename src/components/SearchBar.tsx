import { Form, Button, Input, Select, Space} from "antd";

const handleSearchFinish = (values)=> {
  console.log(values);

    return(
        <>
          <Form
            name="search"
            form={form}
            layout="inline"
            onFinish={handleSearchFinish}
            initialValues={{
              price: {
                number: 0,
                currency: 'rmb',
              },
            }}
          >
            <Form.Item name="title" label="Title">
              <Input placeholder="please enter" allowClear/>
            </Form.Item>
            <Form.Item name="variety" label="Variety">
              <Select 
                allowClear
                placeholder="please select"
                options={[
                  { value: 'jack', label: 'Jack' },
                  { value: 'lucy', label: 'Lucy' },
                  { value: 'Yiminghe', label: 'yiminghe' },
                  { value: 'disabled', label: 'Disabled', disabled: true },
                ]}/>
            </Form.Item>
            <Form.Item>
              <Space>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
              <Button type="primary" htmlType="submit">
                Clear
              </Button>
              </Space>
            </Form.Item>
          </Form>
            
        </>
    )
}

const [form] = Form.useForm();

export default handleSearchFinish;