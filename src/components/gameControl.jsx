import React, { Component } from 'react';


class GameControls extends Component {
    state = {  }

    
    
    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    /* 
        Function Name : secondsToMMHHSS
        params        : seconds => datatypes (integer)
        Retun         : converted time in HH-MM-SS
        Effects       : this function will conver the time into HH-MM-SS format.
        Reason        : 
    */
     secondsToMMHHSS(seconds) {
         //converting seconds to hours
        let hours = Math.floor(seconds/3600);
        /*if get the hour less than an hours then hour will 00, 
        otherwise the significant number from the result (hours) will be multiplied by 3600 (one hour == 3600 seconds) 
        and deduct from the given value (seconds). 
        As a result, now we have actual hours and  and secondes */
        (hours >= 1) ? seconds = seconds - (hours*3600) : hours = '00';

        //Now we will convert the subsequent seconds into minutes
        let min = Math.floor(seconds/60);
        /*Same way, if we get the minues below 1 then the output will be 00
        otherwise the significant number from the result (min) will be multilied by 60( 1 min = 60 seconds) and deduct from the
        left over seconds 
         At this stage, we have hours, minutes and seconds*/

        (min >= 1) ? seconds = seconds - (min*60) : min = '00';
         /* Now we have to make sure that the is no decimal point left. if the left over seconds is below 0 then the seconds will become 00*/
        (seconds < 1) ? seconds='00' : void 0;
        
        /* formating the result  */
        (min.toString().length === 1) ? min = '0'+min : void 0;    
        (seconds.toString().length === 1) ? seconds = '0'+seconds : void 0;    

        return hours+':'+min+':'+seconds;
    }
    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/


    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    /* 
        Function Name : rederLevels()
        params        :none
        Retun         :a list of li elements
        Effects       : the fution will trivers through levels array and creting a list of li elements
                        and adiing nesscessary attributes to it and adding onclcik event. 
        Reason        : 
    */
    renderLevels(){
        const _levels = this.props.levels.map((levelInfo, level)=>{
             let _span;
             if(levelInfo.status === "solved"){
                 _span = <span 

                    className={"duration"}
                    >
                         {"(" + (this.secondsToMMHHSS(levelInfo.durationOfComplition?levelInfo.durationOfComplition: 0))+")"}  
                    </span>
             }
             else  if(levelInfo.status === "unsolved"){
                 _span = <span 
                    className={"unsolved"}>
                         {"(unsolved)"}   
                    </span>
             }
             else{
                 _span = <span 
                    className={"locked"}>
                         {"(locked)"}   
                    </span>

             }
            return(
                <li onClick= {()=>this.props.loadgame(level)} key={"level-" +(level +1)}>
                    {"level-" +(level +1)}{_span}
                </li>
            );
        });
        return _levels;
    }
    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    



    render() { 
        let _gameData = JSON.parse(window.localStorage.getItem("paused_gamedata"));
        let _currrentLevel = JSON.parse(window.localStorage.getItem("paused_currentlevel"));
        let _duration = JSON.parse(window.localStorage.getItem("paused_duration"));
        let _reload_game = _gameData !== null && _currrentLevel !== null && _duration !==null ? 
                            <li id={"reload-game"} onClick = {this.props.resumePause}>{"Reload Game"}</li> :null;
        //pause or play icon
        let _play_pause = this.props.isPaused?
                        <i className= "fa fa-play"></i>:
                        <i className = "fa fa-pause"></i>;

        let _undo= this.props.totalMoves === 0 ? {display:"none",}:{display:"block"};
        let _redo = this.props.totalMoves === this.props.currentMove ? {display:"none"} : {display:"block"};
        return ( 
            <div className = "game-controls">
                <div className= "controls">
                    <div className = "menu">
                        <div className = "menu-button">Menu <i className = "fa fa-caret-down"></i></div>
                        <div className = "drop-down-list">
                            <ul>
                                <li>
                                    <div className="nested-menu">
                                        <div className = "nested-menu-button">New Game <i className= "fa fa-caret-right"></i></div>
                                        <div className = "nested-drop-down-list">
                                            <ul>
                                                {this.renderLevels()}
                                            </ul>

                                        </div>
                                    </div>

                                </li>
                                <li
                                 id ="save-game"
                                 onClick={this.props.saveGame}
                                >
                                    {"Save Game"}
                                </li>
                               {_reload_game}

                            </ul>

                        </div>
                    </div>
                    <div className= "play-pause"onClick={this.props.playPause}>{_play_pause}</div>
                    <div id="img-button" className = "image-review" onClick={this.props.showImage}><i className="fa fa-image"></i></div>
                    <div className ="backandforth" style={_undo} onClick={this.props.undo}><i className ="fa fa-undo"></i></div>    
                    <div className ="backandforth" style={_redo} onClick={this.props.redo}><i className ="fa fa-undo"></i></div>    
                </div>
                
                
                <div className = "game-info">
                    <div className = "info-block">
                        <div className = "info-name">
                            Current level:
                        </div>
                        <div className ="info-value">
                            {"level -" + (this.props.currentLevel +1)}
                        </div>                         
                    </div>
                    <div className = "info-block">
                            <div className = "info-name">
                                Duration:
                            </div>
                            <div className ="info-value">
                                {this.secondsToMMHHSS(this.props.timer)}
                            </div>
                        </div>
                </div>

               
            </div>
         );
    }
}
 
export default GameControls;