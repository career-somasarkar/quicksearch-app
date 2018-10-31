import React from 'react';
import ReactDom from 'react-dom';
import {RESERVATION_DATA} from './reservationData'
import './style.css'
import OptionComponent from './optionComponent'

class Index extends React.Component{
    constructor(props){
        super(props);
        this.state={
            DATA:RESERVATION_DATA,
            STATUS: [{type: 'Status', id:'1'},
                    {type: 'Confirmed', id:'2'}, 
                    {type: 'Seated', id:'3'},
                    {type: 'Checked out', id:'4'},
                    {type: 'Cancelled', id:'5'}],
            DATE: [{type: 'Date', id:'1'},
                    {type: '02.08.2018', id:'2'}, 
                    {type: '03.08.2018', id:'3'},
                    {type: '04.08.2018', id:'4'},
                    {type: '05.08.2018', id:'5'}, 
                    {type: '06.08.2018', id:'6'},
                    {type: '07.08.2018', id:'7'},
                    {type: '08.08.2018', id:'8'}, 
                    {type: '09.08.2018', id:'9'},
                    {type: '10.08.2018', id:'10'},
                    {type: '11.08.2018', id:'11'}, 
                    {type: '12.08.2018', id:'12'},
                    {type: '13.08.2018', id:'13'}],
            SHIFT: [{type: 'Shift', id:'1'},
                    {type: 'Breakfast', id:'2'}, 
                    {type: 'Lunch', id:'3'},
                    {type: 'Dinner', id:'4'}],
            AREA: [{type: 'Area', id:'1'},
                    {type: 'All', id:'2'}, 
                    {type: 'Bar', id:'3'},
                    {type: 'Main Room', id:'4'}],
            SelectedStatus:"",
            SelectedDate:"",
            SelectedShift:"",
            SelectedArea:""
        };
        this.sortBy = this.sortBy.bind(this);
        this.CompareBy = this.CompareBy.bind(this);
        this.objCompareBy = this.objCompareBy.bind(this);

        this.getSelectedStatus = this.getSelectedStatus.bind(this);
        this.getSelectedDate = this.getSelectedDate.bind(this);
        this.getSelectedShift = this.getSelectedShift.bind(this);
        this.getSelectedArea = this.getSelectedArea.bind(this);

        this.filterData = this.filterData.bind(this);
        this.filterByName = this.filterByName.bind(this);
    }

    sortBy(col, isAsc)
    {
        var reservedata = [...this.state.DATA];
        let sortedData = col == "customer"? reservedata.sort(this.objCompareBy(col, isAsc))
        : reservedata.sort(this.CompareBy(col, isAsc));;
        //debugger;
        this.setState({DATA:sortedData});
    }

    objCompareBy(col, isAsc) {
        return function (a, b) {
            if(isAsc){
                if (a[col].firstName < b[col].firstName) return 1;
                if (a[col].firstName > b[col].firstName) return -1;}
            else{
                if (a[col].firstName < b[col].firstName) return -1;
                if (a[col].firstName > b[col].firstName) return 1;
            }
            return 0;
          };
    }
        
    CompareBy(col, isAsc){
        return function (a, b) {
            if(isAsc){
                if (a[col] < b[col]) return 1;
                if (a[col] > b[col]) return -1;
            }
            else{
                if (a[col] < b[col]) return -1;
                if (a[col] > b[col]) return 1;
            }
            return 0;
        };       
    }    
    getSelectedStatus(status){
        //debugger;
        this.setState({SelectedStatus:status});
        let date = this.state.SelectedDate;
        let shift = this.state.SelectedShift;
        let area = this.state.SelectedArea;
        this.filterData(status,date,shift,area)
    }
    getSelectedDate(date){
        this.setState({SelectedDate:date});
        let status = this.state.SelectedStatus;
        let shift = this.state.SelectedShift;
        let area = this.state.SelectedArea;
        this.filterData(status,date,shift,area)
    }
    getSelectedShift(shift){
        this.setState({SelectedShift:shift});
        let date = this.state.SelectedDate;
        let status = this.state.SelectedStatus;
        let area = this.state.SelectedArea;
        this.filterData(status,date,shift,area)
    }
    getSelectedArea(area){
        this.setState({SelectedArea:area});
        let date = this.state.SelectedDate;
        let shift = this.state.SelectedShift;
        let status = this.state.SelectedStatus;
        this.filterData(status,date,shift,area)
    }
    
    filterData(status,date,shift,area){
        let data = RESERVATION_DATA;
        var reservedata = data;
        //debugger;
        if(status == "" || status == " " || status == "undefined" || status == "Status"){}
        else{
            reservedata = reservedata.filter(item=>{
                return (item.status.toLowerCase()== status.toLowerCase());
            });
        }
        if(date == "" || date == " " || date == "undefined" || date == "Date"){}
        else{
            reservedata = reservedata.filter(item=>{
                return (item.businessDate == date);
            });
        }
        if(shift == "" || shift == " " || shift == "undefined" || shift == "Shift"){}
        else{
            reservedata = reservedata.filter(item=>{
                return (item.shift.toLowerCase()==shift.toLowerCase());
            });
        }
        if(area == "" || area == " " || area == "undefined" || area == "Area" || area =="All"){}
        else{
            reservedata = reservedata.filter(item=>{
                return (item.area.toLowerCase()== area.toLowerCase());
            });
        }
        this.setState({DATA:reservedata});
        if(status == "Status" && date == "Date" && shift == "Shift" && area == "Area"){
            //debugger;
            this.setState({DATA:data});
        }        
    }
    filterByName(e)
    {
        let data = RESERVATION_DATA;
        let reservedata = data.filter(item=>{
            return (item.customer.firstName.toLowerCase().search(e.target.value.toLowerCase()) !== -1
            || item.customer.lastName.toLowerCase().search(e.target.value.toLowerCase()) !== -1);
        });
        this.setState({DATA:reservedata});
    }
    render()
    {
        return(
            <div>
                <h1>Reservation List</h1>
                <div className="headerDiv">
                    <div className="header filterLabel"><b>Filter By:</b></div>
                    <OptionComponent OptionItems={this.state.STATUS} 
                        HandleChangeEvent={this.getSelectedStatus.bind(this)}/>
                    <OptionComponent OptionItems={this.state.DATE}
                        HandleChangeEvent={this.getSelectedDate.bind(this)}/>
                    <OptionComponent OptionItems={this.state.SHIFT}
                        HandleChangeEvent={this.getSelectedShift.bind(this)}/>
                    <OptionComponent OptionItems={this.state.AREA}
                        HandleChangeEvent={this.getSelectedArea.bind(this)}/>
                    <div className="header txtDiv">
                        <input className="inputText" type="text" placeholder="Search reservation"
                        onChange={e=>this.filterByName(e)} ></input>
                    </div>                    
                </div>
                <div className="dataTable">
                <table>
                    <thead>
                        <tr>
                            <th><input type="checkbox"></input></th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Shift</th>
                            <th><div><label className="sortLabel">Guest number</label>                            
                                    <div className="sortLabel smallWidth">
                                        <div className="arrow up" onClick={()=>this.sortBy('id',true)}></div>
                                        <div className="arrow down" onClick={()=>this.sortBy('id',false)}></div>
                                    </div>
                                </div>
                            </th>
                            <th><div><label className="sortLabel">Guest Name</label>                            
                                    <div className="sortLabel smallWidth">
                                        <div className="arrow up" onClick={()=>this.sortBy('customer',true)}></div>
                                        <div className="arrow down" onClick={()=>this.sortBy('customer',false)}></div>
                                    </div>
                                </div>
                            </th>
                            <th>Area</th>
                            <th>Guest Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    this.state.DATA.map(item=>                    
                        <tr className="tableDataRow" key={item.id}>
                            <td><input type="checkbox"></input></td>
                            <td>
                                {
                                    item.status== null || item.status == "" || item.status == " "?
                                    <label className="noData">no status</label>
                                    : item.status.toLowerCase() == "confirmed" ?
                                     <div className="statusIcon confirm"></div>
                                    : item.status.toLowerCase() == "seated" ?
                                     <div className="statusIcon seated"></div>
                                    : item.status.toLowerCase() == "checked out"?
                                     <div className="statusIcon checkedout"></div>
                                    : <div className="statusIcon notconfirmed"></div>
                                }
                                <label className="status">{item.status}</label>
                            </td>
                            <td>{item.businessDate}</td>
                            <td>{item.shift}</td>
                            <td>{item.id}</td>                            
                            <td>{
                                (item.customer != null)?
                                    <label>{item.customer.firstName +", "+ item.customer.lastName}</label>
                                :<label>customer not available</label>
                                }
                            </td>
                            <td>{item.area}</td>
                            <td>{
                                item.guestNotes =="" || item.guestNotes==" "?
                                <label className="noData">no notes</label>
                                : <label>{item.guestNotes}</label>
                            }</td>
                        </tr>                    
                    )
                }
                </tbody>
                </table>
                </div>
            </div>
        );
    }
};

ReactDom.render(<Index/>, document.getElementById('root'))
