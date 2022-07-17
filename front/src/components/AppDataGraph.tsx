import { Paper } from "@mui/material"
import { StateContext } from './../context/State'
import { useContext, useEffect, useState } from "react"
import CanvasJSReact from './canvasjs.react';
let CanvasJSChart = CanvasJSReact.CanvasJSChart;
type GraphDataProps = {
    typeData: number,
    level?:number
}

export const AppDataGraph = (props: GraphDataProps) => {
    const { currentQuestion, currentAllData } = useContext(StateContext)
    const [data, setData] = useState<any>()
    const [color, setColor] = useState<any>()
    const options = {
        animationEnabled: true,
        zoomEnabled: true,
        title:{
            text: props.typeData === 1 ? "Фотоплетизмограмма, вопрос" : "Пьезоплетизмограмма, вопрос",
            fontFamily: 'inherit',
        },
        axisX: {
            titleFontFamily: 'inherit',
            interval: 20,
        },
        toolTip:{
            shared: true
        },
        data: [{
            name: color === 'green' ? "низкий" : (color == 'orange' ? 'средний' : 'высокий'),
            type: "spline",
            showInLegend: true,
            color: color,
            dataPoints: data
        }]
    }
    useEffect(() => {
        const question = currentAllData.filter((item: any) => item.id === currentQuestion.question)[0]
        if (question.class_label == 0) {
            setColor("green")
        } else if (question.class_label == 1) {
            setColor("orange")
        } else setColor("red")
        if (props.typeData === 1) {
            let _data: any[] = []
            question.data1.map((item: number, index: number) => _data.push({ x: index, y: item }))
            setData(_data)
        } else {
            let _data: any[] = []
            question.data2.map((item: number, index: number) => _data.push({ x: index, y: item }))
            setData(_data)
            console.log(_data);
            
        }
    }, [currentQuestion])
    return <Paper style={{ width: '40%', padding: 24, borderRadius: '16px', color: "#333950" }} elevation={3}>
        <CanvasJSChart options = {options}/>
    </Paper>
}