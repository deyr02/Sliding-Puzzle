import React, { Component } from 'react';
import GameControls from './gameControl';
import MessageBox from './messageBox';
import Board from './board';
import "./stylesheet.css";
import Level_1 from "./gameImage/level_1.jpg";
import Level_2 from "./gameImage/level_2.jpg";
import Level_3 from "./gameImage/level_3.jpg";
import Level_4 from "./gameImage/level_4.jpg";
import Level_5 from "./gameImage/level_5.jpg";
class Game extends Component {

    constructor(props){
        super(props);
         this.state = this.newGame(0);
      

    }
    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    /* 
        Function Name : 
        params        :
        Retun         :
        Effects       : 
        Reason        : 
    */

    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    

    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    /* 
        Function Name : setMessage(messageType, textMessage)
        params        : messageType ->Datatype string (message Type could be among 'waring', 'success', and 'status')
                        textMessage -> DataType string (The message we want to display in the message box).
        Retun         : none.
        Effects       : The funtion will set the value for message object and updae the messsage componet. 
        Reason        : 
    */
   setMessage(messageType, textMessage){
       let _message = {messageType: messageType, textMessage:textMessage}
       this.setState({
            message:_message
       });
   }

    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    

    //This variable holds the information of level status
    levelStatus = {
        SOLVED: "solved",
        UNSOLVED: "unsolved",
        LOCKED: "locked",
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    // Function Name: setLevels()
    // Retun: nothing
    // Effects: This function will save the level state to the local storage.
    // Reaon: To keep track of all solved, unsolved , and unlock level.
    setLevels(levels){
        window.localStorage.setItem("slidingMazeLevel", JSON.stringify(levels));
    }
   /*-----------------------------------------------------------------------------------------------*/
   /*-----------------------------------------------------------------------------------------------*/

    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    // Function Name: getLevels()
    // Retun: Return array: List of levels
    // Effects: This function will retrieve infromation from the local storage.
    // Reason: To keep track of all solved, unsolved, and unlock level. so that every time player start
    //         new game does not change the level status. 
    getLevels(){

        let levels = JSON.parse(window.localStorage.getItem("slidingMazeLevel"));
        let newLevelSet = 
        [
            {status:"unsolved", imageUrl:Level_1, durationOfComplition:null, gridWidth:3, gridHeight:3,},
            {status:"locked", imageUrl:Level_2, durationOfComplition:null, gridWidth:4, gridHeight:4},
            {status:"locked", imageUrl:Level_3, durationOfComplition:null, gridWidth:5, gridHeight:5},
            {status:"locked", imageUrl:Level_4, durationOfComplition:null, gridWidth:6, gridHeight:6},
            {status:"locked", imageUrl:Level_5, durationOfComplition:null, gridWidth:7, gridHeight:7},

        ]
        return levels? levels: newLevelSet;
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    

    
    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    /* 
        Function Name : createBlockList(gWidth, gHeight)
        params        : gWidth-> datatypes should be integer
                        gHeight-> datatypes dhoud be integer
        Retun         : return an array of objects.
        Effects       : The funcion will produce an array of objects. the array size depens on the given 
                        value in the parameter. Each item in the array will be an object. the object will 
                        hold information something like below
                        
                        {id:0 (interger) , x: 000, y:000,  width: 000(integer), height:0 (integer)}
                         id: this is going to be the id for the imge-block 
                         x: x cordiante of the image
                         y: y cordiante of the image
                         width: width of the sliced image.
                         height: heidht of the slicd image.

        Reason        : 
    */
    createBlockList(gWidth, gHeight){
        //all the game image is already set to height:1000 and widhth:1000;
        let _blockWidth = 1000 / gWidth;
        let _blockHeight = 1000 / gHeight;
        let _arraySize = gWidth * gHeight;
        
        //initialize array with _arraysize and make all item null;
        let _blockList = Array(_arraySize).fill(null);
        //initialize id . it will increase as block build.
        let _id =0;
        for(let i =0; i<gWidth; i++){
            for(let j =0; j<gHeight; j++){
                // x coridnates
                let _x = j*_blockWidth;
                //y corinates
                let _y = i*_blockHeight;
                //each object below will help to slice the picute. 
                _blockList[_id] = {id: _id, x:_x, y:_y, width:_blockWidth, height:_blockHeight};
                //id is going to be element id
                // x : x cordinates of the image
                // Y: y corinates of the image;
                // width : width from x cordinate of the image;
                // height: height from y cordiates of the image

                //make sure id is increading. 
                _id++;
            }
        }
        return _blockList;
    }
    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    
    
    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    /* 
        Function Name : shuffleBLocks (blockList)
        params        :blockList -> dataTypes should be an array
        Retun         :An array
        Effects       : the function will shuffle the element of the given array and then rerun the 
                        shuffled array.
        Reason        : 
    */
    shuffleBlocks(blockList){
        for(let i =0; i<blockList.length; i++){
            //get a random number between 0 and i+1
            const j = Math.floor(Math.random() * (i+1));
            //using map to shuffle the item between  i and the random number.
            [blockList[i], blockList[j]] =[blockList[j], blockList[i]];
        }
        return blockList;
    }
    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    


    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    /* 
        Function Name : constructBoard(gamelevel)
        params        : gameLevel-> Datatypes should be integer between 0 and 4. 
        Retun         : return an  object
        Effects       : the function will create an array  and array size may varies depending on the 
                        given value of gameleve. Basically gamelevel is the level index to retrieve 
                        value form  level array and get the value of gridwidth and gridHediht. The 
                        multification of gridwidth and gridHeight is total size of the array. 

                        later the item in the array will be reshuffled.

        Reason        : As the boardData is not constant size of array we need to produce the array 
                        from the given gamelevel. This way we can initialize different game level.
    */
    constructBoard(gameLevel){
        //retrieving the selected level object.
        let _selectedLevel = this.getLevels()[gameLevel]; 
        //retrieving level width and Height
        let _gridWidth = _selectedLevel.gridWidth;
        let _gridHeight = _selectedLevel.gridWidth;
        //get the block List
        let _blockList = this.createBlockList(_gridWidth, _gridHeight);
        //shuffle the blockListh
        let _shuffledBlockList = this.shuffleBlocks(_blockList);
        return [{ board:_shuffledBlockList, moveID: 0},];
    }
    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    



    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    // Function Name: newGame(gameLevel)
    // params       : gameLeve-> DataTypes should be 'integer'
    // Retun        : A full object: application state
    // Effects      : The Game start from level 0 , but it will not change leve status. Means if the level is solved,
    //                 unsolved, or locked. it won't change the state. 
    // Reason       : It is an option to player if the stuck in certain level, they can reset the Game. jut by simply 
    //                choosing the level.

    newGame(gameLevel){
        let _data;
        if (this.getLevels()[gameLevel].status === "locked"){
            this.setMessage("warning", "The selected level-"+ ( gameLevel +1) + " is locked.")
        }
        else{

            _data = {
                levels: this.getLevels(),
                currentLevel: gameLevel,
                currentMove:0,
                isPaused:true,
                duration:null,
                timerID:null,
                gameData: this.constructBoard(gameLevel),
                message:{messageType:null, textMessage:null,},
            }
            
        }
    

        console.log(_data);
        return _data;
    }
    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    


    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    /* 
        Function Name : loadgame(gameLevel)
        params        :GameLevel: dataType -> integer
        Retun         :None
        Effects       : Basically , this function is an event hander for  onclick event attached to the li
                        element under Menu -> NewGame - Level (li elements).
                        this function will load the selected level.
        Reason        : 
    */
    LoadGame(gameLevel){
        //making sure that no timer is running
        // if running it will cleared the timer
        if(this.state.timerID){
            this.clearTimerID(this.state.timerID);
        }
      
        //updating the state with the selected game level.
        this.setState(this.newGame(gameLevel));
            console.log(gameLevel);


        
    }
    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    



    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    /* 
        Function Name : playPause()
        params        : none
        Retun         : none
        Effects       : The function basically pause the timer or reinstate the timer.
        Reason        : 
    */

    playPause(){
        if(this.isWinner(this.getLastMove())){
            this.setMessage("success", "Please reset the board or load new level to play again");
            return;
        }
        
        if(!this.state.isPaused){
            this.clearTimerID(this.state.timerID);

            this.setState({
                timerID : null,
                isPaused: true,
                message:{messageType:"status", textMessage:"The game is paused"}
            })
        }
        else{
            this.setState({
                timerID:this.startTimer(),
                isPaused:false,
                message:{messageType:"status", textMessage: "The game is resumed"}
            });
        
        }

    }

    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    
    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    /* 
        Function Name : SaveGame()
        params        : none
        Retun         : none
        Effects       :  This function will pause the game timer and save the game state into local storage
                        .That means the game can be resumed letter. 
                        So, to keep the game logic and game state real only gameData, currentLevel, duration,
                        and current move will be stored 
        Reason        : 
    */
    saveGame(){
        
        if(!this.state.isPaused){

            this.clearTimerID(this.state.timerID);
            let _gameData = this.state.gameData.slice();
            let _currentLevel= this.state.currentLevel;
            let _currentMove = this.state.currentMove;
            let _duration = this.state.duration;

            window.localStorage.setItem("paused_gamedata", JSON.stringify(_gameData));
            window.localStorage.setItem("paused_currentlevel", JSON.stringify(_currentLevel));
            window.localStorage.setItem("paused_currentMove", JSON.stringify(_currentMove));
            window.localStorage.setItem("paused_duration", JSON.stringify(_duration));

            this.setState({
                timerID : null,
                isPaused: true,
                message:{messageType:"status", textMessage:"The game is saved. You can reload the game from the menu."}
            })
        }
    }
    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/



    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    /* 
        Function Name : paurseOrRsuseGame()
        params        :none
        Retun         : object
        Effects       : This function will pause the game timer and save the game state into local storage
                        .That means the game can be resumed letter. 
                        So, to keep the game logic and game state real only gameData, currentLevel, duration,
                        will be stored 
                         
        Reason        : 
    */
    reloadGame(){ 
        //make sure there is no timer working behing()
        //there could be a situation when playing a game and reload the save game as a result
        //two timer may work behind the app.
        this.clearTimerID(this.state.timerID);
        
        let _gameData = JSON.parse(window.localStorage.getItem("paused_gamedata"));
        let _currentLevel = JSON.parse(window.localStorage.getItem("paused_currentlevel"));
        let _currentMove = JSON.parse(window.localStorage.getItem("paused_currentMove"));
        let _duration = JSON.parse(window.localStorage.getItem("paused_duration"));
        //making sure that timer started once the game resumed.
        
        if(_gameData !== null && _currentLevel !== null && _currentMove !== null && _duration !== null){
            let _data = {
                levels: this.getLevels(),
                currentLevel: _currentLevel,
                currentMove: _currentMove,
                isPaused:false,
                duration:_duration,
                timerID: null,
                gameData: _gameData,
                message:{messageType:"status", textMessage:"The game has resumed.",},
            }
            this.setState(_data);

        }
        else{
            this.setMessage("warning", "Sorry, there is no save game found.");
        }
        

       

    }
    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    






    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    /* 
        Function Name : showImage()
        params        :none
        Retun         :none
        Effects       : the function will hide all blocks and display an image to match the blocks accordingly.
        Reason        : 
    */

        showImage(){
            document.getElementById("blocks").classList.toggle("hide");
            document.getElementById("board-img").classList.toggle("show");
            if(
                  document.getElementById("blocks").classList.length === 1 &&
                document.getElementById("board-img").classList.length ===1
            ){
                document.getElementById("img-button").style.backgroundColor = "#f05945";
                this.setMessage("status", "Reviewing Image: The imge to match.");
            }
            else{
                document.getElementById("img-button").style.backgroundColor = "transparent";
                this.setMessage(null, null);


            }
        }

    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    

    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    /* 
        Function Name : undo()
        params        : none
        Retun         : none
        Effects       : this function basically take the game state into the previous move
        Reason        : this is an opportunity for the player to go back.
    */

    undo(){
         if(this.isWinner(this.getLastMove())){
            this.setMessage("success", "Please reset the board or load new level to play again");
            return;
        }
        if(this.state.currentMove > 0){
            let _currentMove = this.state.currentMove -1;
            this.setState({
                currentMove:_currentMove,
                message:{messageType:null, textMessage:null},
            });
        }
        else if (this.state.currentMove === 0){
            this.setMessage("warning", "You have reached the starting point. ");
        }
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    



    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    /* 
        Function Name : redo()
        params        : none
        Retun         : none
        Effects       : this function basically take the game state into the forwarded move
        Reason        : this is an opportunity for the player to go forward from the past move.
    */

    redo(){
         if(this.isWinner(this.getLastMove())){
            this.setMessage("success", "Please reset the board or load new level to play again");
            return;
        }
        if(this.state.currentMove === this.state.gameData.length-1){
            this.setMessage("warning", "There is no more move you make in the past. ")
        
        }
        else {
            let _currentMove = this.state.currentMove +1;
            this.setState({
                currentMove:_currentMove,
                message:{messageType:null, textMessage:null},
            })
        }
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    

    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    /* 
        Function Name : isWinner()
        params        : newMove: dataType move object
        Retun         : a boolean value
        Effects       : the function justify the  new move which is creating in the handleClick functiion
                        if the new move is a winning move return true else return false.
        Reason        : 
    */
    isWinner(newMove){
        
        let _blockList = newMove.board;
        for(let i =0; i<_blockList.length; i++ ){
            if(_blockList[i].id !== i){
                return false;
            }
        }
        return true;
    }
    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    

    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    /* 
        Function Name : 
        params        :
        Retun         :
        Effects       : 
        Reason        : 
    */

    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    

    
    
    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    /* 
        Function Name : blockPosition(id)
        params        : id => id of block-canvas
        Retun         : the index number of the given block-cavas is from the last move.
        Effects       : The function will triverse through board array of the last element of gamedata.board 
                        And find the elemeent holding given id, then return the index number.
        Reason        : 
    */
    blockPosition(id){
        let _lastMove = this.getLastMove().board;
        let _index = null;
        for(let i =0; i<_lastMove.length; i++){
            if(_lastMove[i].id ===  parseInt(id)){
                return _index = i;
            }
        }
        return _index;
    }
    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    




    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    /* 
        Function Name : getLastMove()
        params        :none
        Retun         : return an object {board: [array of block], moveid: 0 (moved id)}
        Effects       : The function retriece th last element from the game data
        Reason        : As the border will allways render the lastmove.
    */
    getLastMove(){
        return  this.state.gameData[this.state.currentMove];
    }
    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    

    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    /* 
        Function Name : convertToTwoDimension(index, gWidth, gHeight) 
        params        : index -> Datatype: integer: this index is going to convert into 2D
                        gwdith-> Datatype: integer: 
                        gHeidht -> data type integer:
        Retun         : An object  with x and y value similar like {x:0 ,Y:0}
        
        Effects       : The funtion will convert the given index number into two dimension array based on
                        given 2d array combination.
        Reason        : 
    */
   convertToTwoDimension(index, gWidith, gHediht){
       let _x = parseInt (parseInt(index) / gWidith);
       let _y = parseInt(index) % gHediht;
       return {x:_x, y:_y};
   }

    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    

    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    /* 
        Function Name : isValidMove(blockIndex, emptyBlockIndex, gWidth, gHediht)
        params        :
        Retun         :a boolean value
        Effects       : This function will justify the move if the move is valid then return true else false.
                        The move will be valid if the selected block and emty block situated one block away either
                        vertically or horizonatally.


                        Due flex box design the element of the array will be wrappped with in the container below.
                      -------------------
                      -  0  -  1  -  2  - 
                      -------------------
                      -  E  -  s  -  5  -
                      -------------------
                      -  6  -  7  -  8  -
                      -------------------

                      let suppose we have a board similar to the above grid. The grid represeinting 3X3 grid size.
                      Means gWidith is 3 and g heidht-3.
                      The selected block situated at index 5 and the empty block situated at index 4. 

                      Now we need to translate index 4(1D array ) into 2D array. 
                       for example index  4 will become  [1][1] in 2D array.
                       
                       4/3 (array width) = 1.3333 -> if we parse it into integer then it will be come [1] which is our first arary
                       4%3  (array height) = 1 -> it will be [1] the position of array of array 

                       
                      -------------------------
                      -  0,0  -  0,1  -  0,2  - 
                      -------------------------
                      -  1,0  -  1,1  -  1,2  -
                      -------------------------
                      -  2,0  -  2,1  -  2,2  -
                      -------------------------

                      --------validating horizontally--------
                      if we deduct 1 from the second array index then we can move left block  to the seleftd block.
                      if we add 1 to the second array index then we can move to right block to the selected block
                     -----------Validation vartically.
                     if we deduct 1 form the first array index then we can move to the top block to the selected block.
                     if we add 1 to the first array index then we can move to the bottom block of the selected block

                     Now we just need to confrim the one of these block (left, right, top, botoom) is the empty block. if it is then the 
                     move is valid otherwise it is invalid move

                     we also need to validate indexing of arries

        Reason        : 
    */
    isValidMove(blockIndex, emptyBlockIndex, gridWidth, gridHeight){
         //converting selecting block index into 2D arrray based on given 2D array conbintion
        let _selectedBlock = this.convertToTwoDimension(blockIndex, gridWidth, gridHeight);
         //converting  empty block index into 2D arrray based on given 2D array conbintion
        let _emptyBlock = this.convertToTwoDimension(emptyBlockIndex, gridWidth, gridHeight);

        if((_selectedBlock.x -1 === _emptyBlock.x && _selectedBlock.y === _emptyBlock.y) ||   ///horizontally left
           (_selectedBlock.x +1 === _emptyBlock.x && _selectedBlock.y === _emptyBlock.y) ||   //horixoanttly  right
           (_selectedBlock.x  === _emptyBlock.x && _selectedBlock.y -1 === _emptyBlock.y) ||  // vertically top
           (_selectedBlock.x  === _emptyBlock.x && _selectedBlock.y +1 === _emptyBlock.y)   // vertically botom
        ){
            return true;
        }
        return false;

    }
    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    

    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    /* 
        Function Name : switchBlock(selectedBlockIndex, emptyBlockIndex)
        params        : selectedBLockIndex-> datatype integer
                        emptyBlockIndex -> datatype integer
        Retun         : the modified array list
        Effects       : This is fuction  switch the block between the selected block and emty block  and
                        create  a move id  then  return the new move.
        Reason        : 
    */
   switchBlock(selectedBlockIndex, emptyBlockIndex){
       let _lastMove =  JSON.parse(JSON.stringify(this.getLastMove()));
       console.log(_lastMove);
        let temp = JSON.parse(JSON.stringify( _lastMove.board[emptyBlockIndex]));
         _lastMove.board[emptyBlockIndex] = _lastMove.board[selectedBlockIndex];
         _lastMove.board[selectedBlockIndex] = temp;

      // [_lastMove.board[selectedBlockIndex], _lastMove.board[emptyBlockIndex]] = [_lastMove.board[selectedBlockIndex], _lastMove.board[emptyBlockIndex]];
    //    [_lastMove.board[emptyBlockIndex], _lastMove.board[selectedBlockIndex]] = [_lastMove.board[selectedBlockIndex], _lastMove.board[emptyBlockIndex]];
       _lastMove.moveID = _lastMove.moveID +1;

       return _lastMove;
       
       
   }

    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    


    
    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    /* 
        Function Name : handleClick(id)
        params        : id => number (block-canvas- id)
        Retun         :Nothing
        Effects       : this is the main event of the game. This function attached with every block 
                        component except  the empty block (white-background). it help to move the 
                        selected block to the nearest empty block (switch the position of blocks between the 
                        selected black and the empty block). After selecting a block, The function will come 
                        into affect only when the empty block situated vertically or horizonattly one block away.
                        if the empty block situated diagonally or far from the selected block the function will
                        render a error message in the message component. 
        Reason        : 
    */
    handleClick(id){
        //if user alredy win the level, restrict user to reset the game or reload.
        if(this.isWinner(this.getLastMove())){
            this.setMessage("success", "Please reset the board or load new level to play again");
            return;
        }

        //get the gridwidth and gridthe height from the current level
        let _gridWidth = this.state.levels[this.state.currentLevel].gridWidth;
        let _gridHeight = this.state.levels[this.state.currentLevel].gridHeight;
        
        //get the selected block(the blocked we clicked to swich) index from the last object element of gamedata array. and then
        //triverse through gamedata.board.
        let _selectedBlockPosition = this.blockPosition(id);
        let _emptyBLockPosition = this.blockPosition(0);

        // make sure that the slected block can move to the empty block
        let _isValidMove = this.isValidMove(_selectedBlockPosition, _emptyBLockPosition, _gridWidth, _gridHeight);
    
           //if it is the first move then  isPaused will become false and we want to reinstate the timer.
        let _gameData = this.state.gameData.slice();
        let _isPaused = _gameData.length === 1? false: this.state.isPaused;

        //if game is pause stop user to move the block
        if(_gameData.length !== 1 &&  _isPaused){
            this.setMessage("warning", "Please resume the game.");    
            return;
        }
        let _timerID = this.state.timerID? this.state.timerID: this.startTimer();
        
        if(_isValidMove){
            //the vaid move
           let newMove = this.switchBlock(_selectedBlockPosition, _emptyBLockPosition);
           _gameData.push(newMove);

           //if the new move is a wining move update the message and update the level.
           // stop timer
           // update the complitiontime in the selected level
           //if the next level is locked set it to  unsloved.
           if(this.isWinner(newMove)){
               this.state.timerID !== null ? this.clearTimerID(this.state.timerID): void 0;
               let _currentLevel = this.state.currentLevel;
               let _levels = this.getLevels();
               let _duration = this.state.duration;
               let _messageType = "success";
               let _textMessage = "Congratulation. You have completed level-"+(_currentLevel+1)+".";

              
             _levels[_currentLevel].durationOfComplition === null ? _levels[_currentLevel].durationOfComplition = _duration: 
                _duration < _levels[_currentLevel].durationOfComplition? _levels[_currentLevel].durationOfComplition = _duration:  void 0;
                                
              console.log(_levels[_currentLevel].durationOfComplition);
             _levels[_currentLevel].status = "solved";
              if(_currentLevel +1 <= _levels.length-1){
                if(_levels[_currentLevel +1].status === "locked"){
                    _levels[_currentLevel +1].status = "unsolved";
                    _textMessage = "Congratulation. You have successfully unlocked level-"+(_currentLevel+2)+".";
                }
              }
              this.setLevels(_levels); 
            //update levels and necessary info
            this.setState({
                levels: _levels,
                gameData: _gameData,
                currentMove: _gameData.length-1,
                message:{messageType:_messageType, textMessage:_textMessage},
                isPaused: true,
                timerID: _timerID, 
                duration: _duration,
            });

               console.log("winner");
           }
           else{
                //update the state and rerender the board.
                this.setState({
                    gameData: _gameData,
                    currentMove: _gameData.length-1,
                    message:{messageType:null, textMessage:null},
                    isPaused: _isPaused,
                    timerID: _timerID, 
                });
            }
        }
        else{

             this.setState({
               message:{messageType:"warning", textMessage:"Invalid move."},
               isPaused: _isPaused,
               timerID: _timerID, 
           });
        }
    }
    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    



    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    /* 
        Function Name : startTimer()
        params        : none
        Retun         : function id (data type => integer)
        Effects       : This function will start timer through the setInterval function and return 
                        a function id.
        Reason        : 
    */
    startTimer(){
        let timerId = null;
       

            timerId =  setInterval(() => {
                let _duration = this.state.duration+1;
                this.setState({duration:_duration});     
                }, 1000);
        return timerId
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    


    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    /* 
        Function Name : clearTimer(timerID)
        params        : timerID => datatype integer
        Retun         :none;
        Effects       : this functer will clear setTimeInterval function (applied by setTimer function);
        Reason        : 
    */
     clearTimerID(timerID){
         clearInterval(timerID);
     }
    /*-----------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/
    




    state = {  }
   
    render() { 
      
     
        return (
            <div className="game">
                <div className = "game-nav">  
                    <GameControls
                    currentLevel = {this.state.currentLevel}
                    levels = {this.getLevels()}
                    timer = {this.state.duration}

                    loadgame ={(i)=> this.LoadGame(i)}
                    isPaused = {this.state.isPaused}
                    playPause = {()=>this.playPause()}
                    saveGame = {()=> this.saveGame()}
                    resumePause = {()=> this.reloadGame()}
                    showImage = {()=>this.showImage()}
                    currentMove = {this.state.currentMove}
                    totalMoves = {this.state.gameData.length-1}

                    undo = {()=>this.undo()}
                    redo = {()=>this.redo()}

                    >      
                    </GameControls>
                    <MessageBox
                        messageType = {this.state.message.messageType}
                        textMessage = {this.state.message.textMessage}
                    ></MessageBox>
                </div>            
  
                <Board
                    level = {this.state.levels[this.state.currentLevel]}
                    blockList ={this.getLastMove().board}
                    handleClick ={(id)=>this.handleClick(id)}
                >  </Board>

            </div>
          );
    }
}
 
export default Game;