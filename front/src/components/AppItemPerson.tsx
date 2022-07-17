import { Avatar, Badge, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material"
import a1 from './images/avatar/1.png'
import a2 from './images/avatar/2.png'
import a3 from './images/avatar/3.png'
import a4 from './images/avatar/4.png'
import { StateContext } from './../context/State'
import { useContext } from "react"
import axios from 'axios'

const Avatars = [
    a1,
    a2,
    a3,
    a4
]

export type ItemPersonProps = {
    color: "errror" | "warning" | "success" | undefined | any,
    avatar: number,
    title: string
}

export const AppItemPerson = (props: ItemPersonProps) => {
    const { setCurrentPerson, setCurrentData, setCurrentAllData } = useContext(StateContext)
    const updateData = async (idPerson:string) => {
        try {
            const url = process.env.REACT_APP_SERVERURL + 'tests/'+idPerson
            const res = await axios.get(url)
            const data = res.data.tests
            const result:any[] = []
            for (let index_test=0; index_test<7; index_test++) {
                let test = data.filter((itemTest:any) => itemTest.test===index_test)
                result[index_test] = []
                for (let index_presentation = 0; index_presentation<4; index_presentation++) {
                    let pres = test.filter((itemPres:any)=>itemPres.presentation === index_presentation)
                    // console.log(index_test, index_presentation, pres);
                    if (pres.length > 0 ) result[index_test].push(pres)
                    // result[index_test][index_presentation] = pres
                }
                if (result[index_test].length === 0) result.pop()
            }
            setCurrentData(result)
            setCurrentAllData(data)
        } catch (err) {
            console.error("POLYGRAPH: ", err);
        }
    }
    const handleClick = () => {
        setCurrentPerson({...props})
        updateData(props.title)

    }
    return <ListItemButton onClick={handleClick}>
        <ListItemAvatar>
            <Badge color={props.color} variant="dot">
                <Avatar src={Avatars[props.avatar]} />
            </Badge>
        </ListItemAvatar>
        <ListItemText primary={props.title} />
    </ListItemButton>
}