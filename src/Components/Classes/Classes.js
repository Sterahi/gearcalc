import React from 'react'
import { css, cx } from 'emotion'

class Classes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gear: [],
            loading: false
        }
    }
    getGear() {
        this.setState({
            loading: true
        })
        fetch("https://xivapi.com/search?filters=LevelEquip=70,LevelItem>=340,ClassJobCategory.ID=38,EquipSlotCategoryTargetID=1")
            .then(res => {
                return res.json()
            }).then(items => {
                this.setState({
                    gear: items.Results,
                    loading: false
                }, () => {
                    this.getGearStats(items.Results)
                })
            })
    }
    getGearStats(object) {
        let storage = {}
        object.map((item, index) => {
            fetch(`https://xivapi.com${item.Url}`).then(res => {
                return res.json()
            }).then(stats => {
                storage[item.Name] = [
                    `${stats.BaseParam0.Name}: ${stats.BaseParamValue0}`,
                    `${stats.BaseParam1.Name}: ${stats.BaseParamValue1}`,
                    `${stats.BaseParam2.Name}: ${stats.BaseParamValue2}`,
                    `${stats.BaseParam3.Name}: ${stats.BaseParamValue3}`,
                    `Materia: ${stats.MateriaSlotCount}`
                ]
            }).then(() => {
                this.setState({
                    gearStats: storage
                })
            })
        })
    }
    componentWillMount() {
        this.getGear()
    }
    render() {
        const { gear, gearStats } = this.state
        const classSelector = css`
            display:flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content:space-around;
        `
        const itemStyle = css`
            width:100%;
            margin-top:5px;
            padding:10px;
            background-color: #111;
            color:#eee;
        `
        return (
            <div className = {cx(classSelector, 'class-selector')}>
                {
                    (gear||[]).map((item) => {
                        if(gearStats === undefined) {
                            return(
                                <div key = {item.ID} className = { cx(itemStyle, 'item')}>
                                    <img src = {`https://xivapi.com/${item.Icon}`} alt = {item.Name} />
                                    <span>{item.Name}</span>
                                </div>
                            )
                        } else {
                            return(
                                <div key = {item.ID} className = {cx(itemStyle, 'item')}>
                                    <div className = {css `display:flex; margin-bottom:5px;`}>
                                        <img src = {`https://xivapi.com/${item.Icon}`} alt = {item.Name} />
                                        <span className= {css`align-self:center;`}><strong>{item.Name}</strong></span><br />
                                    </div>
                                    {
                                        (gearStats[item.Name] || []).map((stats, index) => {
                                            return (
                                                <span key = {index}>{stats} </span>
                                            )
                                        })
                                    }
                                </div>
                            )
                        }
                    })
                }
            </div>
        )
    }
}
export default Classes