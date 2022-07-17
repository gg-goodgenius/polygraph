import { Paper } from "@mui/material"
import { StateContext } from '../context/State'
import { useContext, useEffect, useState } from "react"
import CanvasJSReact from './canvasjs.react';
let CanvasJSChart = CanvasJSReact.CanvasJSChart;
type GraphDataProps = {
    typeData: number
}

export const AppAllDataGraph = (props: GraphDataProps) => {
    const { currentQuestion, currentAllData, currentData } = useContext(StateContext)
    const [data, setData] = useState<any>()
    const options = {
        animationEnabled: true,
        zoomEnabled: true,
        title: {
            text: props.typeData === 1 ? "Фотоплетизмограмма, повторение" : "Пьезоплетизмограмма, повторение",
            fontFamily: 'inherit',
        },
        axisX: {
            titleFontFamily: 'inherit',
            interval: 200,
        },
        toolTip: {
            shared: true
        },
        data: data
    }
    useEffect(() => {
        const pres = currentData[currentQuestion['test']][currentQuestion['pres']]
        let graphAllQ: any[] = []
        let globalIndex = 0
            pres.map((question: any, index: number) => {
                let graphQ: {
                    color: string,
                    dataPoints: any,
                    name: string,
                    showInLegend: boolean,
                    type: string
                } = {
                    color: question.class_label == 0 ? "green" : (question.class_label == 1 ? 'orange' : 'red'),
                    dataPoints: null,
                    name: (index + 1).toString(),
                    showInLegend: true,
                    type: "spline",
                }
                if (props.typeData === 1) {
                    let _data: any[] = []
                    question.data1.map((item: number, index: number) => {
                        _data.push({ x: globalIndex, y: item })
                        globalIndex += 1
                    })

                    graphQ['dataPoints'] = _data
                } else {
                    let _data: any[] = []
                    question.data2.map((item: number, index: number) => {
                        _data.push({ x: globalIndex, y: item })
                        globalIndex += 1
                    })
                    graphQ['dataPoints'] = _data
                }
                graphAllQ.push(graphQ)
            })
            setData(graphAllQ)
            console.log(graphAllQ);
    }, [currentQuestion])
    return <Paper style={{ width: '90%', padding: 24, borderRadius: '16px', color: "#333950" }} elevation={3}>
        <CanvasJSChart options={options} style={{width:'100%', padding:24}}/>
    </Paper>
}