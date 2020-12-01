import React, { Component } from 'react';
import { Table, Space, Modal, Button } from 'antd';
import { Link } from "react-router-dom";
import Api from '../apis/RestFullApi';
const { Column } = Table;
class listUser extends Component {
   state = {
      data: [],
      visible: false,
      loading: false,
      id: ""
   };
   componentDidMount() {
      this.listUser()
   }
   listUser = () => {
      Api.listUser().then((result) => {
         console.log("result", result);
         if (result) {
            this.setState({
               data: result.data.user
            })
         }
         console.log(this.state.data);
      }).catch((err) => {
         console.log('err', err);
      })
   }
   onClick = (e) => {
      console.log('Content: ', e.currentTarget.dataset.href);
      window.open(
         'https://www.google.com/maps/dir//' + e.currentTarget.dataset.href,
         '_blank'
      );
   }
   deleteData = (e) => {
      console.log("data", e);
      this.setState({
         visible: true,
         id: e
      });
      console.log(this.state);
   };
   deleteUser = async (e) => {
      this.setState({ loading: true });
      Api.deleteUser(e).then((result) => {
         console.log(result);
         this.setState({ loading: false, visible: false });
         this.listUser()
      }).catch((err) => {
         console.log('err', err);
      })
   }
   handleOk = () => {
      this.setState({ loading: true });
      setTimeout(() => {
         this.setState({ loading: false, visible: false });
      }, 3000);
   };

   handleCancel = () => {
      this.setState({ visible: false });
   };
   render() {
      const { data, visible, loading, id } = this.state;
      return (
         <div className="wrapper">
            <Button className="mg-bottom-20" type="primary">
               <Link to="/contact">Contact Form</Link>
            </Button>
            <Table dataSource={data} bordered scroll={{ y: 400 }} rowKey={data => data._id}>
               <Column title="Full Name" dataIndex="fullName" key="fullName" />
               <Column title="Email" dataIndex="email" key="email" />
               <Column title="Phone Number" dataIndex="phone" key="phone" />
               <Column
                  title="Address"
                  dataIndex="address"
                  key="address"
                  render={(text, record) => (
                     <Space size="middle">
                        <a href="# " data-href={text} onClick={this.onClick}>{text}</a>
                     </Space>
                  )}
               />
               <Column
                  title="Action"
                  key="action"
                  dataIndex="_id"
                  render={(text, record) => (
                     <Space size="middle">
                        <a className="delete" href="# " onClick={() => this.deleteData(text)}><i className="fas fa-trash-alt"></i> Delete</a>
                     </Space>
                  )}
               />
            </Table>
            <Modal
               visible={visible}
               onOk={this.handleOk}
               onCancel={this.handleCancel}
               footer={[
                  <Button key="back" onClick={this.handleCancel}>
                     Close
                  </Button>,
                  <Button key="submit" type="primary" loading={loading} onClick={() => this.deleteUser(id)}>
                     Delete
                  </Button>,
               ]}
            >
               <h3>You definitely want to delete this user???</h3>
            </Modal>
         </div>
      );
   }
}

export default listUser;
