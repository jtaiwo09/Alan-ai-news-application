import { makeStyles } from '@material-ui/core'

export default makeStyles({
    container: {
        padding: '0 5%',
        width: '100%',
        margin: 0,
        '& .MuiTypography-root': {
            fontSize: '0.8rem'
        }
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '45vh',
        padding: '10%',
        borderRadius: 10,
        color: 'white',
        boxShadow: '4px 10px 5px 0px rgba(0, 0, 0, 0.5)'
    },
    infoCard: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center'
    },
})