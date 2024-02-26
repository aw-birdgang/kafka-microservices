import { ApiProperty } from "@nestjs/swagger";
import { GameLanguageDto } from "./game-language.dto";
import { GameWinningRuleLanguageDto } from "./game-winning-rule-language.dto";

export class GameDetailsDto {
  @ApiProperty()
  gameLanguageDto: GameLanguageDto;

  @ApiProperty()
  gameWinningRuleLanguageList: GameWinningRuleLanguageDto[];


  static from(
    gameLanguageDto: GameLanguageDto,
    gameWinningRuleLanguageList: GameWinningRuleLanguageDto[],
  ) {
    const gameDetailsDto = new GameDetailsDto();
    gameDetailsDto.gameLanguageDto = gameLanguageDto;
    gameDetailsDto.gameWinningRuleLanguageList = gameWinningRuleLanguageList;
    return gameDetailsDto;
  }
}
