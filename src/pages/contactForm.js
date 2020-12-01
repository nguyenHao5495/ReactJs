import React, { Component } from "react";
import { Card, Form, Input, Button, Modal } from "antd";

import Api from '../apis/RestFullApi';

const layout = {
   labelCol: { span: 8 },
   wrapperCol: { span: 16 },
};
const tailLayout = {
   wrapperCol: { span: 24 },
};

class contactForm extends Component {

   state = { visible: false };

   onFinish = (values) => {
      Api.addUser(values).then((result) => {
         console.log("result", result);
         this.modal();

      }).catch((err) => {
         console.log('err', err);
         this.modalError()
      })
   };
   onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
   };
   modal = () => {
      Modal.success({
         visible: this.state.visible,
         content: (
            <div>
               <span>You have successfully submitted data</span>
            </div>
         ),
         onOk: () => {
            this.props.history.push('listUser')
         },
      });
   }
   modalError = () => {
      Modal.error({
         title: 'This is an error message',
         content: (
            <div>
               <span>You have failed to submit data</span>
            </div>
         ),
         onOk() { },
      });
   }
   render() {
      return (
         <Card
            size="big"
            title="Contact"
            style={{ width: 500, textAlign: "center", margin: "20px auto" }}
         >
            <Form
               {...layout}
               name="basic"
               initialValues={{ remember: true }}
               onFinish={this.onFinish}
               onFinishFailed={this.onFinishFailed}
            >
               <Form.Item
                  label="FullName"
                  name="fullName"
                  rules={[
                     {
                        required: true,
                        message: "Please input your username!",
                     },
                     {
                        validator: (_, value) => {
                           if (value && value.length < 3) {
                              return Promise.reject(
                                 "Name length must bigger than 3!"
                              );
                           }
                           if (value && value.length > 24) {
                              return Promise.reject(
                                 "Name length must smaller than 24!"
                              );
                           }
                           return Promise.resolve();
                        },
                     },
                  ]}
               >
                  <Input />
               </Form.Item>

               <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                     {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                     },
                     {
                        required: true,
                        message: 'Please input your E-mail!',
                     },
                  ]}
               >
                  <Input />
               </Form.Item>
               <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[
                     {
                        required: true,
                        message: 'Please input your phone number!',
                     },
                     {
                        validator: (_, value) => {
                           var phoneno = /^([0][1-9]\d+)$/g;
                           if (value && value.length > 10) {
                              return Promise.reject(
                                 "Phone number must smaller than 10!"
                              );
                           }
                           if (value && !phoneno.test(value)) {
                              return Promise.reject(
                                 "Invalid phone number!"
                              );
                           }
                           return Promise.resolve();
                        },
                     },


                  ]}
               >
                  <Input />
               </Form.Item>
               <Form.Item name="address" label="Address">
                  <Input />
               </Form.Item>
               <Form.Item {...tailLayout}>
                  <Button
                     loading={this.props.loading}
                     type="primary"
                     htmlType="submit"
                  >
                     Submit
                        </Button>
               </Form.Item>
            </Form>
         </Card>
      );
   }
}

export default contactForm;
