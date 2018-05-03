import React,{Component} from 'react';
import axios from 'axios';
// 这里如何实现antd组件样式按需加载
import 'antd/lib/date-picker/style/css';  
import 'antd/lib/rate/style/css';  
import 'antd/lib/table/style/css';
import 'antd/lib/input-number/style/css';
import {Table,Icon,Divider,DatePicker,Button,Spin,Affix,InputNumber,Rate  } from 'antd';

const { Column, ColumnGroup } = Table;
const columns = [{
    title: '供应商名称',
    dataIndex: 'SupplierName',
    width: '20%',
  }, {
    title: '联系人',
    dataIndex: 'BankAccountName',
    // filters: [
    //   { text: 'Male', value: 'male' },
    //   { text: 'Female', value: 'female' },
    // ],
    width: '20%',
  }, {
    title: '手机号码',
    dataIndex: 'TelPhoneNum',
  },
  {
    title: '联系地址',
    dataIndex: 'Address',
  },
  {
    title: '备注',
    dataIndex: 'Remark',
  },
];

export default class FetchDemo extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        loading: false,
        pagination: {},
      };
    }
    handleTableChange = (pagination) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            PageSize: pagination.pageSize,
            PageNum: pagination.current
        })
    }
    fetch = (params = {}) => {

        this.setState({ loading: true });
        axios({
            method: 'post',
            url: '/Supplier/GetSupplierList',
            data: {
                StoreID: "c530c3f0-fd41-43e6-b1ee-bbbdeba45b13",
                Keyword: "",
                PageSize: '10',
                PageNum: '1',
                 ...params,
            }
          })
        .then(res=>{
            const pagination = { ...this.state.pagination };
            const data = res.data.ResData.Datas;
            pagination.total = 50;
            this.setState({
                data: data,
                loading: false,
                pagination,
            })
        })
        .catch(error=>{
            console.error(error);// 异常处理
        })
    }
    componentDidMount() {
        this.fetch();
    }
    render() {
      return (
        <div>
            <DatePicker/>
            <Table 
                dataSource={this.state.data}
                rowKey={record => record.registered}  
                loading = {this.state.loading} 
                columns = {columns}
                pagination={this.state.pagination}
                onChange = {this.handleTableChange}>
            </Table>
      </div>
      );
    }
  

  }



