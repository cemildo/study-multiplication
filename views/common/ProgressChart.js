class ProgressChart{
  constructor(manager){
    this.manager = manager;
    this.page = document.querySelector('#canvas');
    this.setColors();
    if(this.manager.db){
      this.init();
    }
  }

  setColors(){
    this.chartColors = [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)'
    ];
  }

  getData(){
    const data = this.getStudentInfo();
    return {
      labels: data.map(item => item.labels).filter(item => item.length>0)[0],
      datasets: data
    };
  }

  getStudentInfo(){
    return this.database.users
    .filter(user => user.settings.type !== 'admin')
    .map(user => [user, this.getDailyCorrectAnswers(user)])
    .map(([user, data], i) => {
      return {
        label: user.settings.userName,
        borderColor: this.chartColors[i % this.chartColors.length],
        backgroundColor: this.chartColors[i % this.chartColors.length],
        fill: false,
        data: Object.values(data),
        yAxisID: `y-axis-1`,
        labels: Object.keys(data)
      }
    });
  }

  getDailyCorrectAnswers(user){
    return user.works.reduce((sum, curr) => {
      if(!sum[curr.date]){
        sum[curr.date] = 0;
      }

      if(curr.score) {
        sum[curr.date]++;
      }

      return sum;
    }, {});
  }

  init(){
    this.database = this.manager.db.getItem(this.manager.appName);
    const ctx = document.getElementById('canvas').getContext('2d');
    window.myLine = Chart.Line(ctx, {
      data: this.getData(),
      options: {
        responsive: true,
        hoverMode: 'index',
        stacked: false,
        title: {
          display: true,
          text: 'Students progress chart'
        },
        scales: {
          yAxes: [{
            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            display: true,
            position: 'left',
            id: 'y-axis-1',
          }],
        }
      }
    });
  }
}



