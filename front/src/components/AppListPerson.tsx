import { useEffect, useState } from "react"
import axios from 'axios'
import { List, Pagination, Paper } from "@mui/material"
import { ItemPersonProps, AppItemPerson } from "./AppItemPerson"


export const AppListPerson = () => {

    const [persons, setPersons] = useState<any>()
    const [limit] = useState<number>(6)
    const [count, setCount] = useState<number>(0)
    const [page, setPage] = useState<number>(1)
    const updatePersons = async () => {
        try {
            const url = process.env.REACT_APP_SERVERURL + 'person/?limit=' + limit + '&offset=' + ((page - 1) * limit).toString()
            const res = await axios.get(url)

            let _persons: Array<ItemPersonProps> = []
            setCount(Math.floor(res.data.count / limit) + 1)
            res.data.results.map((_person: any) => {
                let color: any
                if (_person.level === 0) {
                    color = "success"
                } else if (_person.level === 1) {
                    color = "warning"
                } else {
                    color = "error"
                }
                _persons.push({
                    color,
                    avatar: Math.round(Math.random() * 4),
                    title: _person.name
                })
            })
            setPersons(_persons)
        } catch (err) {
            console.error("POLYGRAPH: ", err);
        }
    }

    useEffect(() => {
        updatePersons()
    }, [])

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        updatePersons()
        setPage(value)
    }

    return (
        <Paper style={{ width: '256px', borderRadius: '16px', color: "#333950", marginTop: "32px", display: 'flex', flexDirection: 'column', alignItems: 'center' }} elevation={3} >
            <List style={{ overflow: 'auto', position: 'relative', maxHeight: 450, paddingTop: 25, paddingBottom: 25 }}>
                {persons && (
                    persons.map((person: ItemPersonProps) => {
                        return <AppItemPerson {...person} />
                    }))
                }
            </List>
            <Pagination style={{ marginBottom: 32 }} count={count} page={page} siblingCount={0} size="small" onChange={handleChange} />
        </Paper>)
}