<?php


class gameTest extends PHPUnit_Framework_TestCase
{

    public function testGetGames()
    {
        $games = Games::get();
        $this->assertEquals(count($games), 5);
    }
}