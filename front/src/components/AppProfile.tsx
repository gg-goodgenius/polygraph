import { Avatar, Button, Paper } from "@mui/material"
import a1 from './images/avatar/1.png'
import a2 from './images/avatar/2.png'
import a3 from './images/avatar/3.png'
import a4 from './images/avatar/4.png'
import { StateContext } from './../context/State'
import { useContext } from "react"
import { useState } from "react"
import { useEffect } from "react"
import axios from 'axios'

const Avatars = [
    a1,
    a2,
    a3,
    a4
]

export const AppProfile = () => {
    const { currentPerson } = useContext(StateContext)
    const [color, setColor] = useState<any>("#0F0")
    const [level, setLevel] = useState<string>("низкий")

    const calc = async () => {
        try {
            const url = process.env.REACT_APP_SERVERURL + 'calc/'+currentPerson.title
            const res = await axios.get(url)
            console.log(res);
        } catch (err) {
            console.error("POLYGRAPH: ", err);
        }
    }

    const handleCalc = () => {
        calc()
    }

    useEffect(() => {

        if (currentPerson?.color === "error") {
            setColor("#F00")
            setLevel("высокий")
        } else if (currentPerson?.color === "warning") {
            setColor("#ed6c02")
            setLevel("средний")
        } else {
            setColor("#0F0")
            setLevel("низкий")
        }
    }, [currentPerson])
    return <Paper style={{ borderRadius: '16px', color: "#333950", display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'space-between' }} elevation={3} >
        {currentPerson && <>
            <Avatar src={Avatars[currentPerson.avatar]} style={{ width: 100, height: 100, margin: 16, borderRadius: '8px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end', marginRight: 16 }}>
                <div style={{ fontSize: '18pt' }}>{currentPerson.title}</div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 16, }}>
                    <div style={{ width: 16, height: 16, backgroundColor: color,  marginRight:16, borderRadius:16}}>
                    </div><div>{level}</div>
                </div>
                <Button onClick={handleCalc} >Получить оценку стресса</Button>
            </div>
        </>
        }
    </Paper>
}