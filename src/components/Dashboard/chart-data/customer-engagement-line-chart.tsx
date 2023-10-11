const chartData: any =
    {
        height: 350,
        type: "line",
        options: {
            chart: {
                id: 'line-chart',
                height: 350,
                type: 'line',
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: false
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: [2, 2, 2, 2],
                curve: 'smooth',
            },
            title: {
                text: 'Customer Engagement',
                align: 'left'
            },
            legend: {
                tooltipHoverFormatter: function (val: any, opts: any) {
                    return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
                }
            },
            markers: {
                size: 0,
                hover: {
                    sizeOffset: 6
                }
            },
            xaxis: {
                type: 'datetime',
                // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            tooltip: {
                y: [
                    {
                        title: {
                            formatter: function (val: any) {
                                return val + " (mins)"
                            }
                        }
                    },
                    {
                        title: {
                            formatter: function (val: any) {
                                return val + " per session"
                            }
                        }
                    },
                    {
                        title: {
                            formatter: function (val: any) {
                                return val;
                            }
                        }
                    }
                ]
            },
            grid: {
                borderColor: '#f1f1f1',
            }
        },
        series: [
            {
                name: "Initial Customer Submission",
                data: randomData('2023-05-18', '2023-05-29')
            },
            {
                name: "Initial Approval",
                data: randomData('2023-05-18', '2023-05-29')
            },
            {
                name: "Initial Rejection",
                data: randomData('2023-05-18', '2023-05-29')
            },
            {
                name: "Secondary Submission",
                data: randomData('2023-05-18', '2023-05-29')
            }
        ],
    };

export default chartData;

function randomData(fromDate: string, toDate: string) {
    const start = new Date(fromDate);
    const end = new Date(toDate);

    let data = [];

    let loop = new Date(start);
    while (loop <= end) {
        let newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);

        data.push({
            x: loop,
            y: Math.floor(Math.random() * 100)
        })
    }

    return data;
}