import { TreeItem, TreeView } from "@mui/lab"
import { Paper } from "@mui/material"
import { StateContext } from './../context/State'
import { useContext } from "react"



export const AppDataList = () => {
    const { currentData, setCurrentQuestion } = useContext(StateContext)
    const handleQuestionClick = (idQ: any) => {
        setCurrentQuestion(idQ)
    }

    let nodeId = 0
    return <Paper style={{ width: '40%', padding: 24, borderRadius: '16px', color: "#333950" }} elevation={3}>
        <TreeView>
            {currentData &&
                currentData.map((test: any, index: number) => {
                    nodeId++
                    return <TreeItem nodeId={nodeId.toString()} label={"Тест " + (index + 1).toString()} >
                        {test.map((pres: any, indexPres: number) => {
                            nodeId++

                            return <TreeItem nodeId={nodeId.toString()} label={"Повторение " + (indexPres + 1).toString()}>
                                {
                                    pres.map((q: any, indexQ: number) => {
                                        const _test = index
                                        const _pres = indexPres
                                        const _question:number = q["id"]
                                        nodeId++
                                        return <TreeItem
                                            nodeId={nodeId.toString()}
                                            color="red"
                                            label={"Вопрос " + (indexQ + 1).toString()}
                                            onClick={() => handleQuestionClick({ test: _test, pres: _pres, question: _question })}
                                        />
                                    })
                                }
                            </TreeItem>
                        })}
                    </TreeItem>
                })
            }
        </TreeView>
    </Paper>
}