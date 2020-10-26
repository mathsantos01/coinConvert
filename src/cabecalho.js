import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import {makeStyles} from '@material-ui/core/styles'

import HomeIcon from '@material-ui/icons/Home';




const Cabecalho = () => {
    const useStyles = makeStyles((theme) => ({
        ToolbarTitulo: {
            flex: 1 /*FlexBox*/
        },
        ToolbarSecundaria:{
            justifyContent: 'space-between'
        }
    }))

    const classes = useStyles()

    const secoes = [
        {},
    ]

    return(
        <> {/*React Fragment*/}
            <AppBar position="relative">
                <Toolbar>
                    <HomeIcon href=""/>
                    <Typography 
                        component='h1'
                        align="center"
                        color="inherit"
                        className={classes.ToolbarTitulo}
                    ><h4>CoinConvert</h4>
                    </Typography>          
                </Toolbar>
            </AppBar>
            

            <Toolbar component="nav" className={classes.ToolbarSecundaria}>
                {secoes.map((secao) => (
                    <Link color="secondary"
                         key={secao.titulo}
                         className={classes.ToolbarLink}
                         href={secao.url}>{secao.titulo}
                    </Link>
                ))}
            </Toolbar>    
        </>
    )
}

export default Cabecalho