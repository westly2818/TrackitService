

async function getDashboardData(req, res, next) {
  try {
    let dashboardData='dashboard api works fine'
    res.send({ status: "success", data: dashboardData })
  }
  catch (err) {
    console.log(err)
  }
};
async function getnames(req, res, next) {
  try {
names=[{'westly':"backendDev"},{'vichu':"backendDev"},{'vibsh':"FrontendDev"},{'sansai':"frontendDev"}]
res.send(names)
  }
  catch (err) {
    console.log(err)
  }
};

module.exports = {
  getDashboardData: getDashboardData,
  getnames:getnames
}
