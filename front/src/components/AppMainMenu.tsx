import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import AddIcon from '@mui/icons-material/Add';
import TuneIcon from '@mui/icons-material/Tune';
import { Paper } from '@mui/material';
import axios from 'axios'
import { useState, useRef } from 'react'

export const AppMainMenu = () => {
    const hiddenFileInput = useRef<any>()

    const sendFile = async (file:any) => {
        try {
            console.log(file.name);
            const data = new FormData() 
            data.append('file', file)
            const url = process.env.REACT_APP_SERVERURL + 'upload/'+file.name
            const res = await axios.put(url, data)
            console.log(res);
            
        } catch (err) {
            console.error("POLYGRAPH: ", err);
        }
    }

    const handleChange = (event:any) => {
        const fileUploaded = event?.target?.files[0]
        sendFile(fileUploaded)
    }

    const handleLoad = (event:any) => {
        hiddenFileInput?.current?.click();
    }
    return <Paper style={{ width: '256px', borderRadius: '16px', color: "#333950" }} elevation={3} >
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer', height: '48px', width: '224px', padding: '12px 24px 12px 24px' }}>
            <StackedLineChartIcon style={{ width: '24px', height: '24px' }} />
            <div style={{ fontSize: "12pt", marginLeft: '24px', fontWeight: "700" }} >Анализ</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer', height: '48px', width: '224px', padding: '12px 24px 12px 24px' }}>
            <AddIcon style={{ width: '24px', height: '24px' }} />

            <div style={{ fontSize: "12pt", marginLeft: '24px', fontWeight: "700" }} onClick={handleLoad}>
                <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                />
                Загрузить</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer', height: '48px', width: '224px', padding: '12px 24px 12px 24px' }}>
            <TuneIcon style={{ width: '24px', height: '24px' }} />
            <div style={{ fontSize: "12pt", marginLeft: '24px', fontWeight: "700" }} >Настройки</div>
        </div>
    </Paper>
}