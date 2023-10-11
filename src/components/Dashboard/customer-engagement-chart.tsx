import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';
import {useSelector} from "react-redux";
import {useTheme} from "@mui/material/styles";
import SkeletonCustomerEngagementChart from '../../utils/ui-components/cards/skeleton/customer-engagement-chart';
import MainCard from "../../utils/ui-components/MainCard";
import {Grid, Typography} from "@mui/material";
import {gridSpacing} from "../../store/constants";

// chart data
import chartData from './chart-data/customer-engagement-line-chart';
import {currencyFormat} from "../../utils/utils";

CustomerEngagementChart.propTypes = {
    isLoading: PropTypes.bool.isRequired,
};

function CustomerEngagementChart({isLoading}: any) {

    const theme = useTheme();
    const customization = useSelector((state: any) => state.customization);

    const {navType} = customization;
    const {primary} = theme.palette.text;
    const grey200 = theme.palette.grey[200];
    const grey500 = theme.palette.grey[500];

    useEffect(() => {
        const newChartData = {
            ...chartData?.options,
            yaxis: {
                labels: {
                    style: {
                        colors: [primary]
                    }
                }
            },
            grid: {
                borderColor: grey200
            },
            tooltip: {
                theme: 'light'
            },
            legend: {
                labels: {
                    colors: grey500
                }
            }
        };

        // do not load chart when loading
        if (!isLoading) {
            ApexCharts.exec(`line-chart`, 'updateOptions', newChartData);
        }
    }, [navType, primary, grey200, isLoading, grey500]);

    return (
        <>
            {isLoading ? (
                <SkeletonCustomerEngagementChart/>
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="subtitle2">Total Growth</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h3">{currencyFormat(2324, "Rs. ", 2)}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Chart {...chartData} />
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
}

export default CustomerEngagementChart;