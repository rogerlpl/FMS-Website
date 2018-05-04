import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import {
  Schedule,
  DirectionsBus,
  DateRange,
  RemoveRedEye,
  LocalOffer,
  FormatColorFill,
  Update,
  Opacity,
  AccessTime
} from "material-ui-icons";
import { withStyles, Grid } from "material-ui";

import {
  StatsCard,
  ChartCard,
  RegularCard,
  Table,
  ItemGrid
} from "components";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts";

import dashboardStyle from "variables/styles/dashboardStyle";

class Dashboard extends React.Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={DirectionsBus}
              iconColor="orange"
              title="Cantidad de Bus en operaciones"
              description="49/50"
              small="Fichas"
              statIcon={RemoveRedEye}
              statText="Ver por tipo de servicio"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={FormatColorFill}
              iconColor="green"
              title="Total de existencia en movimiento"
              description="48,000"
              small="Galones"
              statIcon={DateRange}
              statText="Mostrar reporte de consumo por rutas y servicios"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={Opacity}
              iconColor="red"
              title="Consumo total promedio flota"
              description="75"
              small="Galones/Kilometro"
              statIcon={LocalOffer}
              statText="Obtener reportes e indicadores de consumo"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={Schedule}
              iconColor="blue"
              title="Tiempo promedio por viajes"
              description="3.8"
              small="Horas"
              statIcon={Update}
              statText="Ver tablas de arribos y retrasos"
            />
          </ItemGrid>
        </Grid>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={4}>
            <ChartCard
              chart={
                <ChartistGraph
                  className="ct-chart"
                  data={dailySalesChart.data}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              }
              chartColor="green"
              title="Consumo Promedio de Combustible por Hora"
              statIcon={AccessTime}
              statText="updated 4 minutes ago"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={4}>
            <ChartCard
              chart={
                <ChartistGraph
                  className="ct-chart"
                  data={emailsSubscriptionChart.data}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              }
              chartColor="orange"
              title="Consumo Promedio por Tipo de Servicio"
              statIcon={AccessTime}
              statText="campaign sent 2 days ago"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={4}>
            <ChartCard
              chart={
                <ChartistGraph
                  className="ct-chart"
                  data={completedTasksChart.data}
                  type="Line"
                  options={completedTasksChart.options}
                  listener={completedTasksChart.animation}
                />
              }
              chartColor="red"
              title="Cantidad de Violaciones en Circulacion"
              statIcon={AccessTime}
            />
          </ItemGrid>
        </Grid>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={6}>
          <RegularCard
              headerColor="red"
              cardTitle="Control de Eventos de Seguridad en Flota"
              content={
                <Table
                  tableHeaderColor="warning"
                  tableHead={["ID", "Fecha", "Ficha", "Chofer","Zona","Tipo de Violacion"]}
                  tableData={[
                    ['1','5/2/2018 14:22:27','156','Ardella Almeida','Carhué','Salida de Ruta'],
                    ['2','5/2/2018 11:55:13','289','Elliot Causon','Tshikapa','Retraso en el Arribo'],
                    ["3",'5/2/2018 4:25:27','893','Emmeline Degoy','Pilcuyo', 'Parada Fuera de Lugar'],
                    ["4",'5/2/2018 5:12:17','414','Gabbie Knowler','Jadowniki','Salida de Ruta']
                  ]}
                />
              }
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={6}>
            <RegularCard
              headerColor="orange"
              cardTitle="Control de Eventos de Operaciones"
              content={
                <Table
                  tableHeaderColor="warning"
                  tableHead={["ID", "Fecha", "Ficha", "Chofer","Parada","Tiempo de Retras"]}
                  tableData={[
                    ['1','5/2/2018 14:22:27','156','Ardella Almeida','Carhué','0 Minutos'],
                    ['2','5/2/2018 11:55:13','289','Elliot Causon','Tshikapa','12 Minutos'],
                    ["3",'5/2/2018 4:25:27','893','Emmeline Degoy','Pilcuyo', '1 Minutos'],
                    ["4",'5/2/2018 5:12:17','414','Gabbie Knowler','Jadowniki','4 Minutos']
                  ]}
                />
              }
            />
          </ItemGrid>
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
