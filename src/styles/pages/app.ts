import { redirect } from "next/dist/server/api-utils";
import { Repeat } from "phosphor-react";
import { styled } from "..";

export const Container = styled("div", {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    minHeight: "100vh",
})

export const Header = styled("header", {
    padding: "2rem 0",
    width:"100%",
    maxWidth: 1100,
    margin: "0 auto",
    display: "flex",
    alignItems: "Center",
    justifyContent: "space-between",

    button: {
        background: "$gray800",
        width: "4rem",
        height: "4rem",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        color: "$gray300",
        cursor: "pointer",

        border: "none",
        borderRadius: "6px",
    }
})

export const BagShopping = styled("div", {
    position: "fixed",
    width: "40rem",
    height: 1028,
    zIndex: 2,
    right: 0,
    top: 0,
    bottom: 0,
    padding: "4rem",

    background: "$gray800",
    color: "$gray100",
    boxShadow: "-4px 0px 30px rgba(0, 0, 0, 0.8)",

    '#cards': {

        width: "100%",
        
        '#close-button': {
            cursor: "pointer",
            border: "none",
            top: "2rem",
            right: "2rem",
            background: "none",
            color: "$gray200",
            position: "absolute",
        }
    },

  
    

    '#amounts': {   
        marginTop: '13rem', 

        div: {
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(2, 2fr)",
            gridGap: "7px",
            

            'span:nth-child(2), strong:nth-child(4)': {
                display: "flex",
                justifyContent: "flex-end"
            },

        },

        

        button: {
            marginTop: "2rem",
            width: "100%",
            height: "5.75rem",
            background: "$green300",
            borderRadius: "8px",
            border: "none",
            color: "$white",
            fontSize: "1.5rem",
            fontWeight: "700",
        }
    }

})

export const CardContainer = styled("div", {
    height: "30.166",

    h2: {
        marginBottom: "2rem",
    },

    section: {
        maxHeight: "360px",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        flex: 1,
        overflowY: "auto"        
    },

})

export const Card = styled("div", {
    display: "flex",
    gap: "1.66rem",
    marginBottom: "2rem",
    

    "#description": {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",

        span: {
            color: "$gray200",
            fontWeight: "400",
        },

        button: {
            display: "flex",
            flexDirection: "flexStart",
            fontWeight: "bold",
            color: "$green300",
            background: "none",
            border: "none",
            cursor: "pointer"
        },
    }
})

export const ImgContainer = styled("div", {
    width: "100px",
    height: "93px",

    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    background: "linear-gradient(180deg, #1EA483 0%, #7465D4 100%)",
})