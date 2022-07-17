import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';
export const AppHeader = () => {
    return <div style={{display:'flex', flexDirection:'row', alignItems:'center', color: "#333950"}}>
        <MonitorHeartOutlinedIcon style={{width:'40px', height:'40px'}}/>   <div style={{ fontSize:"18pt", marginLeft: '16px',  fontWeight: "700"}}>Polygraph</div>
    </div>
}