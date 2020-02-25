import React, { useState, useEffect } from "react";
import { Layout, Input, Select, Button } from "antd";
import { Field, Form, Formik } from "formik";
import styled from "styled-components";
import { ResponsivePie } from "@nivo/pie";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { ExportToCsv } from "export-to-csv";

const { Content } = Layout;
const { Option } = Select;

export default function Home() {
  const MyInput = ({ field, form, ...props }) => {
    return <input {...field} {...props} />;
  };

  const [qteDiver, setQteDiver] = useState(0);
  const [qtePatisserie, setQtePatisserie] = useState(0);
  const [qteCuisine, setQteCuisine] = useState(0);
  const [qteBar, setQteBar] = useState(0);
  const [qteGlob, setQteGlob] = useState(0);

  const data3 = [
    {
      id: "Bar",
      label: "Bar",
      value: !qteBar ? 0 : ((qteBar / qteGlob) * 100).toFixed(2)
    },
    {
      id: "Divers",
      label: "Divers",
      value: !qteDiver ? 0 : ((qteDiver / qteGlob) * 100).toFixed(2)
    },
    {
      id: "Patisserie",
      label: "Patisserie",
      value: !qtePatisserie ? 0 : ((qtePatisserie / qteGlob) * 100).toFixed(2)
    },
    {
      id: "Cuisine",
      label: "Cuisine",
      value: !qteCuisine ? 0 : ((qteCuisine / qteGlob) * 100).toFixed(2)
    }
  ];

  const dataCSV = [
    {
      label: "Bar",
      val: qteBar,
      value: !qteBar ? 0 : ((qteBar / qteGlob) * 100).toFixed(2)
    },
    {
      label: "Divers",
      val: qteDiver,
      value: !qteDiver ? 0 : ((qteDiver / qteGlob) * 100).toFixed(2)
    },
    {
      label: "Patisserie",
      val: qtePatisserie,
      value: !qtePatisserie ? 0 : ((qtePatisserie / qteGlob) * 100).toFixed(2)
    },
    {
      label: "Cuisine",
      val: qteCuisine,
      value: !qteCuisine ? 0 : ((qteCuisine / qteGlob) * 100).toFixed(2)
    },
    {
      label: "Total",
      val: qteGlob,
      value: !qteGlob
        ? 0
        : (qteBar / qteGlob) * 100 +
          (qteDiver / qteGlob) * 100 +
          (qtePatisserie / qteGlob) * 100 +
          (qteCuisine / qteGlob) * 100
    }
  ];
  function generateCsv() {
    var d = new Date();
    var datenow = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
    const CSVoptions = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      showTitle: true,
      title: datenow,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: false,
      headers: ["Libellé", "Recette", "Pourcentage"]
    };
    const csvExporter = new ExportToCsv(CSVoptions);
    csvExporter.generateCsv(dataCSV);
  }
  function Screenshot() {
    var d = new Date();
    var datenow = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
    const pie = document.querySelector(".pie");

    console.log(datenow);
    html2canvas(pie, {
      width: window.innerWidth,
      height: 1000,
      backgroundColor: "#f3f3f3",
      scrollY: window.innerWidth < 500 ? -190 : 0
    }).then(result =>
      result.toBlob(function(blob) {
        saveAs(blob, datenow + ".png");
      })
    );

    //console.log(pie);
  }

  const Sdiv = styled.div`
    width: 240px;
    height: 100px;
    background: skyblue;
    border-radius: 10px;

    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 0 2rem;
    flex-direction: column;
  `;

  const Sdivv = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
  `;

  const Sdivvv = styled.div`
    height: 500px;
    width: 700px;
    margin: 2rem auto;
  `;

  return (
    <>
      <Content
        style={{
          background: "#f3f3f3",
          padding: 24,
          margin: 0,
          minHeight: 280
        }}
      >
        <h1>Test</h1>

        <Formik
          initialValues={{
            catégorie: "Divers",
            quantity: ""
          }}
          onSubmit={(values, actions) => {
            if (values.quantity != "")
              if (values.catégorie == "Divers") {
                setQteGlob(parseInt(values.quantity) + qteGlob);
                setQteDiver(parseInt(values.quantity) + qteDiver);
                console.log(qteGlob);
              } else if (values.catégorie == "Patisserie") {
                setQteGlob(parseInt(values.quantity) + qteGlob);
                setQtePatisserie(parseInt(values.quantity) + qtePatisserie);
              } else if (values.catégorie == "Cuisine") {
                setQteGlob(parseInt(values.quantity) + qteGlob);
                setQteCuisine(parseInt(values.quantity) + qteCuisine);
              } else {
                setQteGlob(parseInt(values.quantity) + qteGlob);
                setQteBar(parseInt(values.quantity) + qteBar);
              }
          }}
        >
          {props => (
            <div className="row">
              <Form className="form">
                <Field
                  as={Input}
                  type="number"
                  name="quantity"
                  placeholder="Prix"
                  className="inputss"
                />
                <Field
                  className="inputss"
                  component={Select}
                  name="catégorie"
                  onChange={e => (props.values.catégorie = e)}
                  defaultValue="Divers"
                >
                  <Option value="Divers">Divers</Option>
                  <Option value="Patisserie">Patisserie</Option>
                  <Option value="Bar">Bar</Option>
                  <Option value="Cuisine">Cuisine</Option>
                </Field>

                <Button htmlType="submit" type="primary" className="buttons">
                  Submit
                </Button>
                <Button type="primary" className="buttons" onClick={Screenshot}>
                  Screenshot
                </Button>
                <Button
                  type="primary"
                  className="buttons"
                  onClick={generateCsv}
                >
                  CSV/Excel
                </Button>
              </Form>
            </div>
          )}
        </Formik>
        <div className="pie">
          <Sdivv>
            <Sdiv key="Divers">
              <h2> Divers</h2> Prix : {qteDiver}
            </Sdiv>
            <Sdiv key="Patisserie">
              <h2> Patisserie</h2> Prix :{qtePatisserie}
            </Sdiv>
            <Sdiv key="Bar">
              <h2> Bar</h2> Prix :{qteBar}
            </Sdiv>
            <Sdiv key="Cuisine">
              <h2> Cuisine</h2> Prix :{qteCuisine}
            </Sdiv>
            <Sdiv key="Total">
              <h2> Total</h2> Prix :{qteGlob}
            </Sdiv>
          </Sdivv>
          <Sdivvv className="pie-container">
            <ResponsivePie
              data={data3}
              margin={{ top: 40, right: 200, bottom: 40, left: 80 }}
              pixelRatio={1}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              colors={{ scheme: "paired" }}
              borderColor={{ from: "color", modifiers: [["darker", 0.6]] }}
              radialLabelsSkipAngle={10}
              radialLabelsTextXOffset={6}
              radialLabelsTextColor="#333333"
              radialLabelsLinkOffset={0}
              radialLabelsLinkDiagonalLength={16}
              radialLabelsLinkHorizontalLength={0}
              radialLabelsLinkColor={{ from: "color" }}
              slicesLabelsSkipAngle={10}
              slicesLabelsTextColor="#333333"
              animate={true}
              motionStiffness={90}
              motionDamping={15}
            ></ResponsivePie>
          </Sdivvv>
        </div>
      </Content>
    </>
  );
}
