import React from 'react';
import 'chart.js/auto';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import axios from 'axios';
import { useState, useEffect, useRef} from 'react';
import { Doughnut } from 'react-chartjs-2'; 
import TableItem from './TableItem';


ChartJS.register(ArcElement, Tooltip, Legend);

const DynamicChart = () => {

    
    const [chartInfo, setChartInfo] = useState([]);
    const [failedInfo, setFailedInfo] = useState([]);
    const [successInfo, setSuccessInfo] = useState([]);

    const [showMissions, setShowMissions] = useState([]);

    const linkVal = useRef();
    



    useEffect(()=>{
        axios.get("https://api.spacexdata.com/v5/launches")
        .then((res)=>{ //if responsive
            let data = res.data;

            //filter works like if
            const succ = data.filter((item) => item.success === true).length;
            const fail = data.filter((item) => item.success === false).length;

            setChartInfo([succ, fail]);

            const successData = [];
            const failData = [];

            for(let i=0;i<data.length;i++){
                if(data[i].success === false){
                    failData.push({
                        id: data[i].id,
                        imgURL: data[i].links.patch.small,
                        flightNum: data[i].flight_number,
                        flightName: data[i].name,
                        videoURL: data[i].links.youtube_id
                    });
                } else{
                    successData.push({
                        id: data[i].id,
                        imgURL: data[i].links.patch.small,
                        flightNum: data[i].flight_number,
                        flightName: data[i].name,
                        videoURL: data[i].links.youtube_id
                    });

                }
            }

   

            setFailedInfo(failData);
            setSuccessInfo(successData);

            //creates the table from data collected
            let startItem = failData.map((item) => <TableItem id={item.id} fname={item.flightName} fnum={item.flightNum} imgUrl={item.imgURL} vidLink={item.videoURL}/> )
         
           setShowMissions(startItem);
           

            

        })
    }, []);

    const failedItems = failedInfo.map((item) => <TableItem id={item.id} fname={item.flightName} fnum={item.flightNum} imgUrl={item.imgURL} vidLink={item.videoURL}/> )
    const successItems = successInfo.map((item) => <TableItem id={item.id} fname={item.flightName} fnum={item.flightNum} imgUrl={item.imgURL} vidLink={item.videoURL}/> )



    const chartData ={
        
            labels: ['Success', 'Failures'],
            datasets: [{
                label: 'Success/Failed Launches',
                data: chartInfo,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    
                ],
                borderWidth: 1
            }]
        
    }

    function updateMission(){
        let getValue = linkVal.current.value;

        if(getValue === "Failed"){
            setShowMissions(failedItems);
        }else if(getValue === "Success"){
            setShowMissions(successItems)
        }
    }

    return (
        <div>
            <div className='left-panel'>
                <Doughnut data={chartData} />
            </div>
            <div className='right-panel'>
                <h3>Mission Information</h3>
                <select onChange={updateMission} ref={linkVal}>
                    <option>Failed</option>
                    <option>Success</option>
                </select>
                <div className='container'>
                    {showMissions}
                </div>
                
            </div>
            
        </div>
    );
};

export default DynamicChart;